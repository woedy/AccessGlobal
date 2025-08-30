import { Button } from "@/components/ui/button";

interface PaymentMethodStepProps {
  paymentMethod: string;
  monthlyPlan: string;
  selectedAmount: number | null;
  customAmount: string;
  onPaymentMethodSelect: (method: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentMethodStep({
  paymentMethod,
  monthlyPlan,
  selectedAmount,
  customAmount,
  onPaymentMethodSelect,
  onNext,
  onBack
}: PaymentMethodStepProps) {
  const getFinalAmount = () => {
    if (monthlyPlan) {
      const monthlyAmounts: Record<string, number> = { education: 1000, global: 5000, impact: 50000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };
  const formatUsd = (n: number) => n.toLocaleString('en-US');

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Stripe Checkout',
      description: 'Secure payment processing by Stripe',
      icon: 'fab fa-stripe-s',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      available: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'fas fa-credit-card',
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      available: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'fab fa-paypal',
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      available: false
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, and other crypto',
      icon: 'fab fa-bitcoin',
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      available: false
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank account transfer',
      icon: 'fas fa-university',
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      available: false
    },
    {
      id: 'momo',
      name: 'Mobile Money',
      description: 'MTN, Vodafone, AirtelTigo',
      icon: 'fas fa-mobile-alt',
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      available: false
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Payment Method</h2>
          <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
            <p className="text-lg font-semibold text-purple-800">
              Donating ${formatUsd(getFinalAmount())} {monthlyPlan ? 'per month' : 'one-time'}
            </p>
            <p className="text-sm text-purple-700 mt-2">
              Stripe provides secure, professional payment processing
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              <i className="fas fa-info-circle mr-2"></i>
              <strong>Note:</strong> Stripe is currently the only available payment method. Other methods will be added soon!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => method.available && onPaymentMethodSelect(method.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  method.available 
                    ? paymentMethod === method.id 
                      ? `${method.borderColor} ${method.bgColor} cursor-pointer` 
                      : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                    : 'border-gray-300 cursor-not-allowed opacity-40'
                }`}
              >
                <div className="flex items-center">
                  <i className={`${method.icon} text-2xl mr-4 ${method.color}`}></i>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${method.available ? 'text-gray-900' : 'text-gray-500'}`}>
                      {method.name}
                    </h3>
                    <p className={method.available ? 'text-gray-600' : 'text-gray-400'}>
                      {method.description}
                    </p>
                  </div>
                  {paymentMethod === method.id && method.available && (
                    <i className="fas fa-check text-green-500 text-xl"></i>
                  )}
                  {!method.available && (
                    <i className="fas fa-lock text-gray-400 text-xl"></i>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start">
              <i className="fab fa-stripe-s text-purple-500 mr-3 mt-1 text-xl"></i>
              <div className="text-sm text-purple-800">
                <p className="font-semibold">Secure Stripe Checkout</p>
                <p>Stripe provides industry-leading security with PCI compliance. Your payment information is processed securely and never stored on our servers.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={onBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={!paymentMethod}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
