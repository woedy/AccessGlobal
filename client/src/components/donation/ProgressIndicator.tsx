interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step < currentStep ? 'bg-green-500 text-white' :
                step === currentStep ? 'bg-blue-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step < currentStep ? <i className="fas fa-check"></i> : step}
              </div>
              {step < 5 && (
                <div className={`w-16 h-1 mx-2 transition-all ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-sm text-gray-600">
          <span className={currentStep === 1 ? 'font-semibold text-blue-600' : ''}>Amount</span>
          <span className={currentStep === 2 ? 'font-semibold text-blue-600' : ''}>Payment</span>
          <span className={currentStep === 3 ? 'font-semibold text-blue-600' : ''}>Details</span>
          <span className={currentStep === 4 ? 'font-semibold text-blue-600' : ''}>Confirm</span>
          <span className={currentStep === 5 ? 'font-semibold text-green-600' : ''}>Success</span>
        </div>
      </div>
    </div>
  );
} 