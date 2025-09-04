// server/email.js
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

  // If EMAIL_FROM is not provided, fall back to using SMTP_USER.
  // This makes setup with Gmail simpler: only user + app password are required.
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
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

function buildReceiptHtml({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }) {
  const prettyAmount = formatAmount(amount, currency);
  const title = isMonthly ? 'Recurring Donation Receipt' : 'Donation Receipt';
  return `
  <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.5;">
    <h2 style="color:#0f766e;">${orgName} — ${title}</h2>
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
    `${orgName} — ${isMonthly ? 'Recurring Donation Receipt' : 'Donation Receipt'}`,
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
    `With gratitude,`,
    `${orgName}`,
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
    subject: `${orgName} — ${isMonthly ? 'Recurring' : 'Donation'} Receipt` ,
    text: buildReceiptText({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }),
    html: buildReceiptHtml({ name, amount, currency, donationId, date, paymentMethod, isMonthly, transactionId, orgName }),
  };

  await transporter.sendMail(mailOptions);
  return { sent: true };
}

module.exports = { sendDonationReceipt };
