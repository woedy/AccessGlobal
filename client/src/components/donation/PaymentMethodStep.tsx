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
      const monthlyAmounts: Record<string, number> = { education: 100, global: 500, impact: 5000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'fas fa-credit-card',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500'
    },
    {
      id: 'stripe',
      name: 'Stripe Checkout',
      description: 'Secure payment processing by Stripe',
      icon: 'fab fa-stripe-s',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'fab fa-paypal',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-600'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, and other crypto',
      icon: 'fab fa-bitcoin',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank account transfer',
      icon: 'fas fa-university',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500'
    },
    {
      id: 'momo',
      name: 'Mobile Money',
      description: 'MTN, Vodafone, AirtelTigo',
      icon: 'fas fa-mobile-alt',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Payment Method</h2>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-blue-800">
              Donating ${getFinalAmount()} {monthlyPlan ? 'per month' : 'one-time'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => onPaymentMethodSelect(method.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === method.id 
                    ? `${method.borderColor} ${method.bgColor}` 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <i className={`${method.icon} text-2xl mr-4 ${method.color}`}></i>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{method.name}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                  {paymentMethod === method.id && (
                    <i className="fas fa-check text-green-500 text-xl"></i>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-shield-alt text-green-500 mr-3 mt-1"></i>
              <div className="text-sm text-gray-600">
                <p className="font-semibold">Secure Payment Processing</p>
                <p>All payment methods are secured with industry-standard encryption. Your financial information is protected.</p>
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
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 