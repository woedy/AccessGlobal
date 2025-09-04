import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

interface MomoDetails {
  provider: string;
  phoneNumber: string;
}

interface CryptoDetails {
  walletAddress: string;
  cryptocurrency: string;
}

interface StripeDetails {
  email: string;
}

interface PayPalDetails {
  email: string;
}

interface PaymentDetailsStepProps {
  paymentMethod: string;
  monthlyPlan: string;
  selectedAmount: number | null;
  customAmount: string;
  cardDetails: CardDetails;
  bankDetails: BankDetails;
  momoDetails: MomoDetails;
  cryptoDetails: CryptoDetails;
  stripeDetails: StripeDetails;
  paypalDetails: PayPalDetails;
  isProcessing: boolean;
  onCardDetailsChange: (field: keyof CardDetails, value: string) => void;
  onBankDetailsChange: (field: keyof BankDetails, value: string) => void;
  onMomoDetailsChange: (field: keyof MomoDetails, value: string) => void;
  onCryptoDetailsChange: (field: keyof CryptoDetails, value: string) => void;
  onStripeDetailsChange: (field: keyof StripeDetails, value: string) => void;
  onPayPalDetailsChange: (field: keyof PayPalDetails, value: string) => void;
  onSubmitPayment: () => void;
  onBack: () => void;
}

export default function PaymentDetailsStep({
  paymentMethod,
  monthlyPlan,
  selectedAmount,
  customAmount,
  cardDetails,
  bankDetails,
  momoDetails,
  cryptoDetails,
  stripeDetails,
  paypalDetails,
  isProcessing,
  onCardDetailsChange,
  onBankDetailsChange,
  onMomoDetailsChange,
  onCryptoDetailsChange,
  onStripeDetailsChange,
  onPayPalDetailsChange,
  onSubmitPayment,
  onBack
}: PaymentDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFinalAmount = () => {
    if (monthlyPlan) {
      if (monthlyPlan === 'custom') {
        return parseInt(customAmount) || 0;
      }
      const monthlyAmounts: Record<string, number> = { education: 100, global: 500, impact: 2000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };
  const formatUsd = (n: number) => n.toLocaleString('en-US');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCardNumber = (cardNumber: string): boolean => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return cleanNumber.length >= 13 && cleanNumber.length <= 19;
  };

  const validateExpiryDate = (expiryDate: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiryDate)) return false;
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };

  const validateCVV = (cvv: string): boolean => {
    return cvv.length >= 3 && cvv.length <= 4 && /^\d+$/.test(cvv);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const validateWalletAddress = (address: string): boolean => {
    return address.length >= 26 && address.length <= 35;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === 'card') {
      if (!cardDetails.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
      if (!validateCardNumber(cardDetails.cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!validateExpiryDate(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!validateCVV(cardDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    } else if (paymentMethod === 'bank') {
      if (!bankDetails.bankName) {
        newErrors.bankName = 'Please select a bank';
      }
      if (!bankDetails.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
    } else if (paymentMethod === 'momo') {
      if (!momoDetails.provider) {
        newErrors.provider = 'Please select a provider';
      }
      if (!validatePhoneNumber(momoDetails.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    } else if (paymentMethod === 'crypto') {
      // No local validations; handled on NOWPayments checkout
    } else if (paymentMethod === 'stripe') {
      if (!validateEmail(stripeDetails.email)) {
        newErrors.stripeEmail = 'Please enter a valid email address';
      }
    } else if (paymentMethod === 'paypal') {
      if (!validateEmail(paypalDetails.email)) {
        newErrors.paypalEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmitPayment();
    }
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'card') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
            <input
              type="text"
              value={cardDetails.cardholderName}
              onChange={(e) => onCardDetailsChange('cardholderName', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="John Doe"
              required
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => onCardDetailsChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              maxLength={19}
              required
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) => onCardDetailsChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                maxLength={5}
                required
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => onCardDetailsChange('cvv', e.target.value)}
                placeholder="123"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                maxLength={4}
                required
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      );
    } else if (paymentMethod === 'bank') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
            <select
              value={bankDetails.bankName}
              onChange={(e) => onBankDetailsChange('bankName', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.bankName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            >
              <option value="">Select your bank</option>
              <option value="access">Access Bank</option>
              <option value="gtb">GTBank</option>
              <option value="zenith">Zenith Bank</option>
              <option value="fidelity">Fidelity Bank</option>
              <option value="uba">UBA</option>
              <option value="other">Other</option>
            </select>
            {errors.bankName && (
              <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
            <input
              type="text"
              value={bankDetails.accountNumber}
              onChange={(e) => onBankDetailsChange('accountNumber', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
            <input
              type="text"
              value={bankDetails.routingNumber}
              onChange={(e) => onBankDetailsChange('routingNumber', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      );
    } else if (paymentMethod === 'momo') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Money Provider *</label>
            <select
              value={momoDetails.provider}
              onChange={(e) => onMomoDetailsChange('provider', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.provider ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            >
              <option value="">Select provider</option>
              <option value="mtn">MTN Mobile Money</option>
              <option value="vodafone">Vodafone Cash</option>
              <option value="airteltigo">AirtelTigo Money</option>
            </select>
            {errors.provider && (
              <p className="text-red-500 text-sm mt-1">{errors.provider}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={momoDetails.phoneNumber}
              onChange={(e) => onMomoDetailsChange('phoneNumber', e.target.value)}
              placeholder="0XX XXX XXXX"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>
      );
    } else if (paymentMethod === 'crypto') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
              <div className="text-sm text-blue-800">
                <p className="font-semibold">Crypto Checkout:</p>
                <p>You will be redirected to a secure NOWPayments page to complete your donation using 200+ cryptocurrencies.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (paymentMethod === 'stripe') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={stripeDetails.email}
              onChange={(e) => onStripeDetailsChange('email', e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.stripeEmail ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            />
            {errors.stripeEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.stripeEmail}</p>
            )}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
              <div className="text-sm text-blue-800">
                <p className="font-semibold">Stripe Checkout:</p>
                <p>You will be redirected to Stripe's secure payment page to complete your donation.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (paymentMethod === 'paypal') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Email *</label>
            <input
              type="email"
              value={paypalDetails.email}
              onChange={(e) => onPayPalDetailsChange('email', e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 ${
                errors.paypalEmail ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            />
            {errors.paypalEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.paypalEmail}</p>
            )}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
              <div className="text-sm text-blue-800">
                <p className="font-semibold">PayPal Payment:</p>
                <p>You will be redirected to PayPal to complete your donation securely.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Details</h2>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-lg font-semibold text-blue-800">
              ${formatUsd(getFinalAmount())} {monthlyPlan ? 'per month' : 'one-time'}
            </p>
            <p className="text-blue-600">
              Payment Method: {paymentMethod === 'card' ? 'Credit/Debit Card' : 
                              paymentMethod === 'bank' ? 'Bank Transfer' : 
                              paymentMethod === 'momo' ? 'Mobile Money' :
                              paymentMethod === 'crypto' ? 'Cryptocurrency' :
                              paymentMethod === 'stripe' ? 'Stripe Checkout' :
                              paymentMethod === 'paypal' ? 'PayPal' : 'Unknown'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {renderPaymentForm()}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-lock text-green-500 mr-3 mt-1"></i>
              <div className="text-sm text-gray-600">
                <p className="font-semibold">Your payment is secure</p>
                <p>We use industry-standard encryption to protect your information. All donations are tax-deductible.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={onBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Donate ${formatUsd(getFinalAmount())}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
