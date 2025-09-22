const nodemailer = require('nodemailer');

function getSmtpConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    EMAIL_FROM,
    ORG_NAME,
  } = process.env;

  const orgName = ORG_NAME || 'Access Global Foundation';
  const from = EMAIL_FROM || (SMTP_USER ? `${orgName} <${SMTP_USER}>` : undefined);
  const enabled = !!(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && from);

  return {
    enabled,
    transporterOptions: {
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: String(SMTP_SECURE || '').toLowerCase() === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    },
    from,
    orgName,
  };
}

function formatAmount(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(Number(amount || 0));
  } catch (error) {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

function buildReceiptHtml({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }) {
  const prettyAmount = formatAmount(amount, currency);
  const title = isMonthly ? 'Recurring Donation Receipt' : 'Donation Receipt';
  return `
  <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.5;">
    <h2 style="color:#0f766e;">${orgName} - ${title}</h2>
    <p>Dear ${name || 'Donor'},</p>
    <p>Thank you for your generous ${isMonthly ? 'recurring ' : ''}donation. Your support helps us create pathways to opportunity for communities worldwide.</p>

    <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin:16px 0;">
      <p><strong>Amount:</strong> ${prettyAmount}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>${isMonthly ? 'Cycle Date' : 'Date'}:</strong> ${new Date(date).toLocaleString()}</p>
      <p><strong>Donation ID:</strong> ${donationId}</p>
      ${transactionId ? `<p><strong>Transaction ID:</strong> ${transactionId}</p>` : ''}
    </div>

    <p><em>This email serves as your receipt for tax purposes.</em></p>
    <p>If you have any questions, reply to this email and our team will help.</p>
    <p>With gratitude,<br/>${orgName}</p>
  </div>`;
}

function buildReceiptText({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }) {
  const prettyAmount = formatAmount(amount, currency);
  return [
    `${orgName} - ${isMonthly ? 'Recurring Donation Receipt' : 'Donation Receipt'}`,
    '',
    `Dear ${name || 'Donor'},`,
    `Thank you for your generous ${isMonthly ? 'recurring ' : ''}donation.`,
    '',
    `Amount: ${prettyAmount}`,
    `Payment Method: ${paymentMethod}`,
    `${isMonthly ? 'Cycle Date' : 'Date'}: ${new Date(date).toLocaleString()}`,
    `Donation ID: ${donationId}`,
    transactionId ? `Transaction ID: ${transactionId}` : '',
    '',
    'This email serves as your receipt for tax purposes.',
    'If you have any questions, reply to this email and our team will help.',
    '',
    'With gratitude,',
    orgName,
  ].filter(Boolean).join('\n');
}

async function sendDonationReceipt({ to, name, amount, currency = 'USD', donationId, date = new Date().toISOString(), paymentMethod, isMonthly = false, transactionId }) {
  const cfg = getSmtpConfig();
  if (!cfg.enabled) {
    console.warn('[email] SMTP not configured; skipping receipt email');
    return { sent: false, reason: 'smtp_not_configured' };
  }

  const transporter = nodemailer.createTransport(cfg.transporterOptions);
  const orgName = cfg.orgName;

  const mailOptions = {
    from: cfg.from,
    to,
    subject: `${orgName} - ${isMonthly ? 'Recurring' : 'Donation'} Receipt`,
    text: buildReceiptText({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }),
    html: buildReceiptHtml({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }),
  };

  await transporter.sendMail(mailOptions);
  return { sent: true };
}

function formatShippingDetails(address) {
  if (!address) return 'Not provided';
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state || address.region,
    address.postal_code,
    address.country,
  ].filter(Boolean);
  return parts.join(', ');
}

function getOrderItemsForEmail(order) {
  if (order && order.summary && Array.isArray(order.summary.items) && order.summary.items.length) {
    return order.summary.items.map(item => ({
      name: item.variantName ? `${item.productName} (${item.variantName})` : item.productName,
      quantity: Number(item.quantity || 1),
      unitPrice: Number(item.unitPrice || 0),
      lineTotal: Number(item.lineTotal || Number(item.unitPrice || 0) * Number(item.quantity || 1)),
    }));
  }

  if (order && Array.isArray(order.items) && order.items.length) {
    return order.items.map(item => {
      const productData = item?.price_data?.product_data || {};
      const unitAmount = item?.price_data?.unit_amount ? item.price_data.unit_amount / 100 : 0;
      const quantity = Number(item?.quantity || 1);
      return {
        name: productData.name || 'Item',
        quantity,
        unitPrice: unitAmount,
        lineTotal: unitAmount * quantity,
      };
    });
  }

  return [];
}

function buildStoreOrderHtml({ orgName, customerName, orderId, items, totalLabel, totalFormatted, currency, shippingDetails, notes }) {
  const rows = items.map(item => `
      <tr>
        <td style="padding:8px;border:1px solid #e5e7eb;">${item.name}</td>
        <td style="padding:8px;border:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">${formatAmount(item.unitPrice, currency)}</td>
        <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">${formatAmount(item.lineTotal, currency)}</td>
      </tr>`).join('');

  const shippingBlock = shippingDetails
    ? `<p><strong>Shipping to:</strong><br/>${shippingDetails}</p>`
    : '';

  const notesBlock = notes
    ? `<p style="margin-top:12px;"><strong>Notes:</strong><br/>${notes}</p>`
    : '';

  return `
  <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.5;">
    <h2 style="color:#0f766e;">${orgName} - Order Confirmation</h2>
    <p>Hi ${customerName || 'there'},</p>
    <p>Thank you for your purchase! We are preparing your order${shippingDetails ? ' for shipment' : ''}.</p>
    <p><strong>Order ID:</strong> ${orderId}</p>

    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Item</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;">Qty</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Unit</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-weight:600;">${totalLabel}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-weight:600;">${totalFormatted}</td>
        </tr>
      </tfoot>
    </table>

    ${shippingBlock}
    ${notesBlock}

    <p>If you have any questions, just reply to this email.</p>
    <p>With gratitude,<br/>${orgName}</p>
  </div>`;
}

function buildStoreOrderText({ orgName, customerName, orderId, items, totalLabel, totalFormatted, shippingDetails, notes, currency }) {
  const lines = [
    `${orgName} - Order Confirmation`,
    '',
    `Hi ${customerName || 'there'},`,
    'Thank you for your purchase!',
    '',
    `Order ID: ${orderId}`,
    '',
    'Items:'
  ];

  items.forEach(item => {
    lines.push(` - ${item.name} x${item.quantity} @ ${formatAmount(item.unitPrice, currency)} = ${formatAmount(item.lineTotal, currency)}`);
  });

  lines.push('');
  lines.push(`${totalLabel}: ${totalFormatted}`);

  if (shippingDetails) {
    lines.push('');
    lines.push('Shipping to:');
    lines.push(` ${shippingDetails}`);
  }

  if (notes) {
    lines.push('');
    lines.push('Notes:');
    lines.push(` ${notes}`);
  }

  lines.push('');
  lines.push('If you have any questions, reply to this email.');
  lines.push('With gratitude,');
  lines.push(orgName);

  return lines.join('\n');
}

async function sendStoreOrderReceipt({ to, order, subjectSuffix = 'Order Confirmation', cc, bcc }) {
  if (!to) {
    return { sent: false, reason: 'missing_email' };
  }

  const cfg = getSmtpConfig();
  if (!cfg.enabled) {
    console.warn('[email] SMTP not configured; skipping store order email');
    return { sent: false, reason: 'smtp_not_configured' };
  }

  const transporter = nodemailer.createTransport(cfg.transporterOptions);
  const currency = (order?.currency || 'USD').toUpperCase();
  const totalAmount = order?.amount_total !== undefined
    ? order.amount_total
    : order?.total !== undefined
      ? order.total
      : order?.summary?.subtotal || 0;
  const totalFormatted = formatAmount(totalAmount, currency);
  const orderId = order?.id || order?.stripeSessionId || order?.metadata?.orderId || 'Order';
  const customerName = (order?.customer && order.customer.name)
    || order?.customer_details?.name
    || order?.shipping_details?.name
    || 'Customer';
  const shippingDetails = order?.shipping_details?.address ? formatShippingDetails(order.shipping_details.address) : null;
  const notes = order?.notes || order?.summary?.notes || null;
  const items = getOrderItemsForEmail(order);
  const totalLabel = `Total (${currency})`;

  const orgName = cfg.orgName || 'Access Global Foundation';

  const mailOptions = {
    from: cfg.from,
    to,
    subject: `${orgName} - ${subjectSuffix}`,
    text: buildStoreOrderText({
      orgName,
      customerName,
      orderId,
      items,
      totalLabel,
      totalFormatted,
      shippingDetails,
      notes,
      currency,
    }),
    html: buildStoreOrderHtml({
      orgName,
      customerName,
      orderId,
      items,
      totalLabel,
      totalFormatted,
      shippingDetails,
      notes,
      currency,
    }),
  };

  if (cc) mailOptions.cc = cc;
  if (bcc) mailOptions.bcc = bcc;

  await transporter.sendMail(mailOptions);
  return { sent: true };
}

module.exports = { sendDonationReceipt, sendStoreOrderReceipt };
