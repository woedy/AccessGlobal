import { useState } from 'react';
import { 
  DonationAmountStep,
  PaymentMethodStep,
  DonorInfoStep,
  PaymentDetailsStep,
  SuccessStep,
  ProgressIndicator
} from '@/components/donation';
import { 
  donationService, 
  DonorInfo, 
  CardDetails, 
  BankDetails, 
  MomoDetails,
  CryptoDetails,
  StripeDetails,
  PayPalDetails
} from '@/services/donationService';

export default function DonationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [monthlyPlan, setMonthlyPlan] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment method states
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });
  const [momoDetails, setMomoDetails] = useState<MomoDetails>({
    provider: '',
    phoneNumber: ''
  });
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails>({
    walletAddress: '',
    cryptocurrency: ''
  });
  const [stripeDetails, setStripeDetails] = useState<StripeDetails>({
    email: ''
  });
  const [paypalDetails, setPaypalDetails] = useState<PayPalDetails>({
    email: ''
  });
  
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const getFinalAmount = (): number => {
    if (monthlyPlan) {
      if (monthlyPlan === 'custom') {
        return parseInt(customAmount) || 0;
      }
      const monthlyAmounts: Record<string, number> = { education: 100, global: 500, impact: 2000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setMonthlyPlan('');
    setCurrentStep(2);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleMonthlyPlanSelect = (plan: string) => {
    setMonthlyPlan(plan);
    setSelectedAmount(null);
    setCustomAmount('');
    setCurrentStep(2);
  };

  const handleDonateClick = () => {
    if (getFinalAmount()) {
      setCurrentStep(2);
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleDonorInfoChange = (field: keyof DonorInfo, value: string) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCardDetailsChange = (field: keyof CardDetails, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleBankDetailsChange = (field: keyof BankDetails, value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleMomoDetailsChange = (field: keyof MomoDetails, value: string) => {
    setMomoDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCryptoDetailsChange = (field: keyof CryptoDetails, value: string) => {
    setCryptoDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleStripeDetailsChange = (field: keyof StripeDetails, value: string) => {
    setStripeDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePayPalDetailsChange = (field: keyof PayPalDetails, value: string) => {
    setPaypalDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Get the appropriate payment details based on method
      let paymentDetails;
      switch (paymentMethod) {
        case 'card':
          paymentDetails = cardDetails;
          break;
        case 'bank':
          paymentDetails = bankDetails;
          break;
        case 'momo':
          paymentDetails = momoDetails;
          break;
        case 'crypto':
          paymentDetails = cryptoDetails;
          break;
        case 'stripe':
          paymentDetails = stripeDetails;
          break;
        case 'paypal':
          paymentDetails = paypalDetails;
          break;
        default:
          throw new Error('Invalid payment method');
      }

      // Prepare donation data for backend
      const donationData = {
        amount: getFinalAmount(),
        isMonthly: !!monthlyPlan,
        monthlyPlan: monthlyPlan || undefined,
        paymentMethod: paymentMethod as 'card' | 'bank' | 'momo' | 'crypto' | 'stripe' | 'paypal',
        donorInfo,
        paymentDetails
      };

      // Submit to backend
      const response = await donationService.submitDonation(donationData);
      
      if (response.success) {
        // Handle redirect for payment gateways (Stripe, PayPal, NOWPayments)
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
          return;
        }
        
        setCurrentStep(5);
      } else {
        // Handle error - you might want to show an error message
        console.error('Donation failed:', response.error);
        alert('Donation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedAmount(null);
    setCustomAmount('');
    setMonthlyPlan('');
    setPaymentMethod('');
    setCardDetails({cardNumber: '', expiryDate: '', cvv: '', cardholderName: ''});
    setBankDetails({bankName: '', accountNumber: '', routingNumber: ''});
    setMomoDetails({provider: '', phoneNumber: ''});
    setCryptoDetails({walletAddress: '', cryptocurrency: ''});
    setStripeDetails({email: ''});
    setPaypalDetails({email: ''});
    setDonorInfo({firstName: '', lastName: '', email: '', phone: '', address: ''});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
   
      
      {/* Only show progress indicator after step 1 */}
      {currentStep > 1 && <ProgressIndicator currentStep={currentStep} />}
      
      {currentStep === 1 && (
        <DonationAmountStep
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          monthlyPlan={monthlyPlan}
          onAmountSelect={handleAmountSelect}
          onCustomAmountChange={handleCustomAmountChange}
          onMonthlyPlanSelect={handleMonthlyPlanSelect}
          onDonateClick={handleDonateClick}
        />
      )}
      
      {currentStep === 2 && (
        <PaymentMethodStep
          paymentMethod={paymentMethod}
          monthlyPlan={monthlyPlan}
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          onPaymentMethodSelect={handlePaymentMethodSelect}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 3 && (
        <DonorInfoStep
          donorInfo={donorInfo}
          onDonorInfoChange={handleDonorInfoChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 4 && (
        <PaymentDetailsStep
          paymentMethod={paymentMethod}
          monthlyPlan={monthlyPlan}
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          cardDetails={cardDetails}
          bankDetails={bankDetails}
          momoDetails={momoDetails}
          cryptoDetails={cryptoDetails}
          stripeDetails={stripeDetails}
          paypalDetails={paypalDetails}
          isProcessing={isProcessing}
          onCardDetailsChange={handleCardDetailsChange}
          onBankDetailsChange={handleBankDetailsChange}
          onMomoDetailsChange={handleMomoDetailsChange}
          onCryptoDetailsChange={handleCryptoDetailsChange}
          onStripeDetailsChange={handleStripeDetailsChange}
          onPayPalDetailsChange={handlePayPalDetailsChange}
          onSubmitPayment={handleSubmitPayment}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 5 && (
        <SuccessStep
          monthlyPlan={monthlyPlan}
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          paymentMethod={paymentMethod}
          donorInfo={donorInfo}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
