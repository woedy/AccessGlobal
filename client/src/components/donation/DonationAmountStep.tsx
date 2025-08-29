import { Button } from "@/components/ui/button";

interface DonationAmountStepProps {
  selectedAmount: number | null;
  customAmount: string;
  monthlyPlan: string;
  onAmountSelect: (amount: number) => void;
  onCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMonthlyPlanSelect: (plan: string) => void;
  onDonateClick: () => void;
}

export default function DonationAmountStep({
  selectedAmount,
  customAmount,
  monthlyPlan,
  onAmountSelect,
  onCustomAmountChange,
  onMonthlyPlanSelect,
  onDonateClick
}: DonationAmountStepProps) {
  const getFinalAmount = () => {
    if (monthlyPlan) {
      const monthlyAmounts: Record<string, number> = { education: 100, global: 500, impact: 5000 };
      return monthlyAmounts[monthlyPlan] || 0;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/assets/access_logo.jpg" 
              alt="Access Global Foundation Logo" 
              className="h-16 w-auto mx-auto mb-6 rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help Us Launch Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're a new foundation with big dreams. Your donation helps us launch our programs and create pathways to opportunity for communities worldwide.
          </p>
          <p className="text-2xl font-bold text-yellow-500 mt-4 italic">The World is Yours.</p>
        </div>

        {/* Donation Amounts */}
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Choose Your Impact</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              onClick={() => onAmountSelect(100)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 100 ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
              }`}
            >
              <div className="text-3xl font-bold text-blue-500 mb-2">$100</div>
              <div className="text-sm text-gray-600">Provides school supplies for one student for a month</div>
            </div>
            <div 
              onClick={() => onAmountSelect(250)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 250 ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
              }`}
            >
              <div className="text-3xl font-bold text-blue-500 mb-2">$250</div>
              <div className="text-sm text-gray-600">Funds health screenings for 10 community members</div>
            </div>
            <div 
              onClick={() => onAmountSelect(500)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 500 ? 'border-yellow-500 bg-yellow-50' : 'hover:border-yellow-500'
              }`}
            >
              <div className="text-3xl font-bold text-yellow-500 mb-2">$500</div>
              <div className="text-sm text-gray-600">Plants 50 trees for environmental restoration</div>
            </div>
            <div 
              onClick={() => onAmountSelect(1000)}
              className={`bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                selectedAmount === 1000 ? 'border-green-500 bg-green-50' : 'hover:border-green-500'
              }`}
            >
              <div className="text-3xl font-bold text-green-500 mb-2">$1000</div>
              <div className="text-sm text-gray-600">Supports microfinance for 5 entrepreneurs</div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input 
                type="number" 
                placeholder="Custom amount" 
                value={customAmount}
                onChange={onCustomAmountChange}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
              <Button 
                onClick={onDonateClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
              >
                <i className="fas fa-heart mr-2"></i> Donate
              </Button>
            </div>
            <p className="text-sm text-gray-600">All donations are secure and tax-deductible</p>
          </div>
        </div>

        {/* Monthly Giving */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Become a Founding Supporter</h2>
          <p className="text-center text-gray-600 mb-8">
            Join our founding community of monthly donors and help us build sustained impact in communities worldwide from the ground up.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              onClick={() => onMonthlyPlanSelect('education')}
              className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer border-2 transition-all ${
                monthlyPlan === 'education' ? 'border-green-500 bg-green-50' : 'hover:border-green-500'
              }`}
            >
              <i className="fas fa-graduation-cap text-green-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Education Supporter</h3>
              <div className="text-2xl font-bold text-green-500 mb-2">$100/month</div>
              <p className="text-sm text-gray-600 mb-4">Funds educational materials and teacher training</p>
              <Button 
                onClick={onDonateClick}
                className="bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Support Education
              </Button>
            </div>

            <div 
              onClick={() => onMonthlyPlanSelect('global')}
              className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer border-2 transition-all ${
                monthlyPlan === 'global' ? 'border-blue-500 bg-blue-50' : 'border-blue-500'
              }`}
            >
              <i className="fas fa-globe text-blue-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Champion</h3>
              <div className="text-2xl font-bold text-blue-500 mb-2">$500/month</div>
              <p className="text-sm text-gray-600 mb-4">Supports all four program areas comprehensively</p>
              <Button 
                onClick={onDonateClick}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full"
              >
                Become a Champion
              </Button>
            </div>

            <div 
              onClick={() => onMonthlyPlanSelect('impact')}
              className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer border-2 transition-all ${
                monthlyPlan === 'impact' ? 'border-yellow-500 bg-yellow-50' : 'hover:border-yellow-500'
              }`}
            >
              <i className="fas fa-hands-helping text-yellow-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impact Partner</h3>
              <div className="text-2xl font-bold text-yellow-500 mb-2">$5000/month</div>
              <p className="text-sm text-gray-600 mb-4">Enables major community development projects</p>
              <Button 
                onClick={onDonateClick}
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
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <i className="fas fa-briefcase mr-2"></i> Learn More
            </Button>
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
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <i className="fas fa-heart mr-2"></i> Explore Options
            </Button>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 lg:p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Your Donation Launches Real Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Will go directly to programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Countries we'll reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Lives we'll transform</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Impact we'll create</div>
            </div>
          </div>
          <p className="text-xl opacity-90 italic">
            Because with your help, we can make the world truly theirs.
          </p>
        </div>
      </div>
    </div>
  );
} 