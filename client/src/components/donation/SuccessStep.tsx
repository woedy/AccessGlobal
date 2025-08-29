import { Button } from "@/components/ui/button";

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface SuccessStepProps {
  monthlyPlan: string;
  selectedAmount: number | null;
  customAmount: string;
  paymentMethod: string;
  donorInfo: DonorInfo;
  onReset: () => void;
}

export default function SuccessStep({
  monthlyPlan,
  selectedAmount,
  customAmount,
  paymentMethod,
  donorInfo,
  onReset
}: SuccessStepProps) {
  const getFinalAmount = () => {
    if (monthlyPlan) {
      const monthlyAmounts: Record<string, number> = { education: 100, global: 500, impact: 5000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const getPaymentMethodDisplay = () => {
    switch (paymentMethod) {
      case 'card':
        return 'Credit/Debit Card';
      case 'stripe':
        return 'Stripe Checkout';
      case 'paypal':
        return 'PayPal';
      case 'crypto':
        return 'Cryptocurrency';
      case 'bank':
        return 'Bank Transfer';
      case 'momo':
        return 'Mobile Money';
      default:
        return 'Unknown';
    }
  };

  const getDonationType = () => {
    if (monthlyPlan) {
      const planNames: Record<string, string> = {
        education: 'Education Supporter',
        global: 'Global Champion',
        impact: 'Impact Partner'
      };
      return `${planNames[monthlyPlan]} (Monthly)`;
    }
    return 'One-time Donation';
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-3xl text-green-500"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your donation of <span className="font-bold text-green-600">${getFinalAmount()}</span> has been processed successfully.
            </p>
            {monthlyPlan && (
              <p className="text-lg text-blue-600 font-semibold">
                You're now a monthly supporter! Thank you for your commitment to making a difference.
              </p>
            )}
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-green-800 mb-3">Donation Summary</h3>
            <div className="text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-green-700">Amount:</span>
                <span className="font-semibold text-green-800">${getFinalAmount()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Type:</span>
                <span className="font-semibold text-green-800">{getDonationType()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Payment Method:</span>
                <span className="font-semibold text-green-800">{getPaymentMethodDisplay()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Donor:</span>
                <span className="font-semibold text-green-800">{donorInfo.firstName} {donorInfo.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Transaction ID:</span>
                <span className="font-semibold text-green-800">AGF{Date.now()}</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              A receipt has been sent to <span className="font-semibold">{donorInfo.email}</span>
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions, please contact us at donations@accessglobalfoundation.org
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white mb-8">
            <h3 className="text-lg font-bold mb-2">Your Impact</h3>
            <p className="text-sm opacity-90">
              Your generous donation will help us launch our programs in education, healthcare, 
              environmental conservation, and economic empowerment around the world.
            </p>
            <p className="text-lg font-semibold mt-3 italic">
              Because with your help, we can make the world truly theirs.
            </p>
          </div>

          {monthlyPlan && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Monthly Donation Active</h3>
              <p className="text-blue-700 mb-3">
                Your monthly donation of ${getFinalAmount()} will be automatically processed each month.
              </p>
              <p className="text-sm text-blue-600">
                You can manage your subscription anytime by contacting our support team.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Return to Homepage
            </Button>
            <Button 
              onClick={onReset}
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Make Another Donation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 