import { Button } from "@/components/ui/button";

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface DonorInfoStepProps {
  donorInfo: DonorInfo;
  onDonorInfoChange: (field: keyof DonorInfo, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DonorInfoStep({
  donorInfo,
  onDonorInfoChange,
  onNext,
  onBack
}: DonorInfoStepProps) {
  const isFormValid = () => {
    return donorInfo.firstName && donorInfo.lastName && donorInfo.email;
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Information</h2>
          <p className="text-xl text-gray-600">We need some details for your donation receipt</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                value={donorInfo.firstName}
                onChange={(e) => onDonorInfoChange('firstName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                value={donorInfo.lastName}
                onChange={(e) => onDonorInfoChange('lastName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={donorInfo.email}
              onChange={(e) => onDonorInfoChange('email', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={donorInfo.phone}
              onChange={(e) => onDonorInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address (Optional)</label>
            <textarea
              value={donorInfo.address}
              onChange={(e) => onDonorInfoChange('address', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={onBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={!isFormValid()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 