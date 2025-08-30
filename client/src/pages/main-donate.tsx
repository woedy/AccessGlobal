import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function DonationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [monthlyPlan, setMonthlyPlan] = useState('');
  const [donationType, setDonationType] = useState<'oneTime' | 'monthly'>('oneTime');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });
  const [momoDetails, setMomoDetails] = useState({
    provider: '',
    phoneNumber: ''
  });
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const getFinalAmount = () => {
    if (monthlyPlan) {
      if (monthlyPlan === 'custom') {
        return parseInt(customAmount) || 0;
      }
      const monthlyAmounts = { education: 100, global: 500, impact: 2000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setMonthlyPlan('');
    setCurrentStep(2);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
  };

  const handleMonthlyPlanSelect = (plan) => {
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

  const handleSubmitPayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setCurrentStep(5);
  };

  // Step 1: Your Original Donation Page (Exactly as you designed it)
  const OriginalDonationPage = () => (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/assets/access_logo.jpg" 
              alt="Access Global Foundation Logo" 
              className="h-48 w-auto mx-auto mb-6 rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Make a Difference</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation creates pathways to opportunity and transforms lives around the world.
          </p>
          <div className="flex justify-center mt-6">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setDonationType('oneTime')}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${donationType==='oneTime' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                One-Time
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${donationType==='monthly' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Donation Amounts (One-Time) */}
        {donationType==='oneTime' && (
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">One-Time Donation</h2>
          <div className="text-center mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="number" 
                placeholder="Custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
              <Button 
                onClick={handleDonateClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
              >
                <i className="fas fa-heart mr-2"></i> Donate
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              onClick={() => handleAmountSelect(1000)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 1000 ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
              }`}
            >
              <div className="text-3xl font-bold text-blue-500 mb-2">$1,000</div>
              <div className="text-sm text-gray-600">Outfits 100 students with school supplies for a year</div>
            </div>
            <div 
              onClick={() => handleAmountSelect(5000)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 5000 ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
              }`}
            >
              <div className="text-3xl font-bold text-blue-500 mb-2">$5,000</div>
              <div className="text-sm text-gray-600">Funds comprehensive health screenings for 1,000 community members</div>
            </div>
            <div 
              onClick={() => handleAmountSelect(10000)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 10000 ? 'border-yellow-500 bg-yellow-50' : 'hover:border-yellow-500'
              }`}
            >
              <div className="text-3xl font-bold text-yellow-500 mb-2">$10,000</div>
              <div className="text-sm text-gray-600">Plants 10,000 trees for environmental restoration</div>
            </div>
            <div 
              onClick={() => handleAmountSelect(50000)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 50000 ? 'border-green-500 bg-green-50' : 'hover:border-green-500'
              }`}
            >
              <div className="text-3xl font-bold text-green-500 mb-2">$50,000</div>
              <div className="text-sm text-gray-600">Provides microfinance to 500 entrepreneurs</div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input 
                type="number" 
                placeholder="Custom amount" 
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
              <Button 
                onClick={handleDonateClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
              >
                <i className="fas fa-heart mr-2"></i> Donate
              </Button>
            </div>
            <p className="text-sm text-gray-600">All donations are secure and tax-deductible</p>
          </div>
        </div>
        )}

        {/* Monthly Giving */}
        {donationType==='monthly' && (
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Become a Monthly Supporter</h2>
          <p className="text-center text-gray-600 mb-8">
            Join our community of monthly donors and create sustained impact in communities worldwide.
          </p>
          <div className="text-center mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="number" 
                placeholder="Custom monthly amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
              <Button 
                onClick={() => { setMonthlyPlan('custom'); handleDonateClick(); }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
              >
                <i className="fas fa-heart mr-2"></i> Donate Monthly
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              onClick={() => handleMonthlyPlanSelect('education')}
              className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer border-2 transition-all ${
                monthlyPlan === 'education' ? 'border-green-500 bg-green-50' : 'hover:border-green-500'
              }`}
            >
              <i className="fas fa-graduation-cap text-green-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Education Supporter</h3>
              <div className="text-2xl font-bold text-green-500 mb-2">$100/month</div>
              <p className="text-sm text-gray-600 mb-4">Funds educational materials and teacher training</p>
              <Button 
                onClick={handleDonateClick}
                className="bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Support Education
              </Button>
            </div>

            <div 
              onClick={() => handleMonthlyPlanSelect('global')}
              className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer border-2 transition-all ${
                monthlyPlan === 'global' ? 'border-blue-500 bg-blue-50' : 'border-blue-500'
              }`}
            >
              <i className="fas fa-globe text-blue-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Champion</h3>
              <div className="text-2xl font-bold text-blue-500 mb-2">$500/month</div>
              <p className="text-sm text-gray-600 mb-4">Supports all four program areas comprehensively</p>
              <Button 
                onClick={handleDonateClick}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full"
              >
                Become a Champion
              </Button>
            </div>

            <div 
              onClick={() => handleMonthlyPlanSelect('impact')}
              className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer border-2 transition-all ${
                monthlyPlan === 'impact' ? 'border-yellow-500 bg-yellow-50' : 'hover:border-yellow-500'
              }`}
            >
              <i className="fas fa-hands-helping text-yellow-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impact Partner</h3>
              <div className="text-2xl font-bold text-yellow-500 mb-2">$2,000/month</div>
              <p className="text-sm text-gray-600 mb-4">Enables major community development projects</p>
              <Button 
                onClick={handleDonateClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-white w-full"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </div>

        {/* Other Ways to Give */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Corporate Sponsorship</h3>
            <p className="text-gray-600 mb-6">
              Partner with us to create lasting impact while building your company's social responsibility profile.
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-blue-500 mt-1 mr-3"></i>
                <span>Custom partnership packages</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-500 mt-1 mr-3"></i>
                <span>Employee engagement opportunities</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-500 mt-1 mr-3"></i>
                <span>Impact reporting and recognition</span>
              </li>
            </ul>
            
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Legacy Giving</h3>
            <p className="text-gray-600 mb-6">
              Create a lasting legacy that continues to open doors and create opportunities for generations to come.
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-blue-500 mt-1 mr-3"></i>
                <span>Planned giving options</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-500 mt-1 mr-3"></i>
                <span>Memorial and tribute gifts</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-blue-500 mt-1 mr-3"></i>
                <span>Endowment opportunities</span>
              </li>
            </ul>
            
          </div>
        </div>

        {/* Impact Statement */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 lg:p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Your Donation Launches Real Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Goes directly to programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Countries impacted</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Lives transformed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Impact happening</div>
            </div>
          </div>
          <p className="text-xl opacity-90 italic">
            Because with your help, the world truly is theirs.
          </p>
        </div>
        )}
      </div>
    </div>
  );

  // Step 2: Payment Method Selection
  const PaymentMethodStep = () => (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Payment Method</h2>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-blue-800">
              Donating ${getFinalAmount().toLocaleString('en-US')} {monthlyPlan ? 'per month' : 'one-time'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid gap-4">
            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === 'card' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <i className="fas fa-credit-card text-2xl mr-4 text-blue-500"></i>
                <div>
                  <h3 className="text-lg font-semibold">Credit/Debit Card</h3>
                  <p className="text-gray-600">Visa, Mastercard, American Express</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('bank')}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === 'bank' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <i className="fas fa-university text-2xl mr-4 text-green-500"></i>
                <div>
                  <h3 className="text-lg font-semibold">Bank Transfer</h3>
                  <p className="text-gray-600">Direct bank account transfer</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('momo')}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === 'momo' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <i className="fas fa-mobile-alt text-2xl mr-4 text-orange-500"></i>
                <div>
                  <h3 className="text-lg font-semibold">Mobile Money</h3>
                  <p className="text-gray-600">MTN, Vodafone, AirtelTigo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={handleBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Back
            </Button>
            <Button
              onClick={handleNext}
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

  // Step 3: Donor Information
  const DonorInfoStep = () => (
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
                onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                value={donorInfo.lastName}
                onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
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
              onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={donorInfo.phone}
              onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address (Optional)</label>
            <textarea
              value={donorInfo.address}
              onChange={(e) => setDonorInfo({...donorInfo, address: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={handleBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Payment Details
  const PaymentDetailsStep = () => {
    const renderPaymentForm = () => {
      if (paymentMethod === 'card') {
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
              <input
                type="text"
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
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
                onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
              <input
                type="text"
                value={bankDetails.routingNumber}
                onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
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
                onChange={(e) => setMomoDetails({...momoDetails, provider: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select provider</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="vodafone">Vodafone Cash</option>
                <option value="airteltigo">AirtelTigo Money</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={momoDetails.phoneNumber}
                onChange={(e) => setMomoDetails({...momoDetails, phoneNumber: e.target.value})}
                placeholder="0XX XXX XXXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        );
      }
    };

    const isFormValid = () => {
      if (paymentMethod === 'card') {
        return cardDetails.cardholderName && cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv;
      } else if (paymentMethod === 'bank') {
        return bankDetails.bankName && bankDetails.accountNumber;
      } else if (paymentMethod === 'momo') {
        return momoDetails.provider && momoDetails.phoneNumber;
      }
      return false;
    };

    return (
      <div className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Details</h2>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-lg font-semibold text-blue-800">
                ${getFinalAmount()} {monthlyPlan ? 'per month' : 'one-time'}
              </p>
              <p className="text-blue-600">
                Payment Method: {paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Mobile Money'}
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
              <Button onClick={handleBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
                Back
              </Button>
              <Button
                onClick={handleSubmitPayment}
                disabled={!isFormValid() || isProcessing}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Donate ${getFinalAmount()}`
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 5: Success Page
  const SuccessStep = () => (
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
                <span className="font-semibold text-green-800">{monthlyPlan ? 'Monthly' : 'One-time'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Payment Method:</span>
                <span className="font-semibold text-green-800">
                  {paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Mobile Money'}
                </span>
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
              Your generous donation will directly support our programs in education, healthcare, 
              environmental conservation, and economic empowerment around the world.
            </p>
            <p className="text-lg font-semibold mt-3 italic">
              Because with your help, the world truly is theirs.
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Return to Homepage
            </Button>
            <Button 
              onClick={() => {
                setCurrentStep(1);
                setSelectedAmount(null);
                setCustomAmount('');
                setMonthlyPlan('');
                setPaymentMethod('');
                setCardDetails({cardNumber: '', expiryDate: '', cvv: '', cardholderName: ''});
                setBankDetails({bankName: '', accountNumber: '', routingNumber: ''});
                setMomoDetails({provider: '', phoneNumber: ''});
                setDonorInfo({firstName: '', lastName: '', email: '', phone: '', address: ''});
              }}
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Make Another Donation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Progress Indicator
  const ProgressIndicator = () => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      {/* Only show progress indicator after step 1 */}
      {currentStep > 1 && <ProgressIndicator />}
      
      {currentStep === 1 && <OriginalDonationPage />}
      {currentStep === 2 && <PaymentMethodStep />}
      {currentStep === 3 && <DonorInfoStep />}
      {currentStep === 4 && <PaymentDetailsStep />}
      {currentStep === 5 && <SuccessStep />}
    </div>
  );
}
