import { Button } from "@/components/ui/button";

export default function Donate() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Make a Difference</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation creates pathways to opportunity and transforms lives around the world.
          </p>
          <p className="text-2xl font-bold text-warning-500 mt-4 italic">The World is Yours.</p>
        </div>

        {/* Donation Amounts */}
        <div className="bg-gradient-to-r from-primary-50 to-warning-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Choose Your Impact</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary-500">
              <div className="text-3xl font-bold text-primary-500 mb-2">$100</div>
              <div className="text-sm text-gray-600">Provides school supplies for one student for a month</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary-500">
              <div className="text-3xl font-bold text-primary-500 mb-2">$250</div>
              <div className="text-sm text-gray-600">Funds health screenings for 10 community members</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-warning-500">
              <div className="text-3xl font-bold text-warning-500 mb-2">$500</div>
              <div className="text-sm text-gray-600">Plants 50 trees for environmental restoration</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-success-500">
              <div className="text-3xl font-bold text-success-500 mb-2">$1000</div>
              <div className="text-sm text-gray-600">Supports microfinance for 5 entrepreneurs</div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input 
                type="number" 
                placeholder="Custom amount" 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
              <Button className="bg-warning-500 hover:bg-warning-600 text-white px-8">
                <i className="fas fa-heart mr-2"></i> Donate
              </Button>
            </div>
            <p className="text-sm text-gray-600">All donations are secure and tax-deductible</p>
          </div>
        </div>

        {/* Monthly Giving */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Become a Monthly Supporter</h2>
          <p className="text-center text-gray-600 mb-8">
            Join our community of monthly donors and create sustained impact in communities worldwide.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <i className="fas fa-graduation-cap text-success-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Education Supporter</h3>
              <div className="text-2xl font-bold text-success-500 mb-2">$100/month</div>
              <p className="text-sm text-gray-600 mb-4">Funds educational materials and teacher training</p>
              <Button className="bg-success-500 hover:bg-success-600 text-white w-full">
                Support Education
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-primary-500">
              <i className="fas fa-globe text-primary-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Champion</h3>
              <div className="text-2xl font-bold text-primary-500 mb-2">$500/month</div>
              <p className="text-sm text-gray-600 mb-4">Supports all four program areas comprehensively</p>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white w-full">
                Become a Champion
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <i className="fas fa-hands-helping text-warning-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impact Partner</h3>
              <div className="text-2xl font-bold text-warning-500 mb-2">$5000/month</div>
              <p className="text-sm text-gray-600 mb-4">Enables major community development projects</p>
              <Button className="bg-warning-500 hover:bg-warning-600 text-white w-full">
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
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Custom partnership packages</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Employee engagement opportunities</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Impact reporting and recognition</span>
              </li>
            </ul>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
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
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Planned giving options</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Memorial and tribute gifts</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Endowment opportunities</span>
              </li>
            </ul>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              <i className="fas fa-heart mr-2"></i> Explore Options
            </Button>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="text-center bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Your Donation Creates Real Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Goes directly to programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">45+</div>
              <div className="text-sm opacity-90">Countries impacted</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500K+</div>
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
      </div>
    </div>
  );
}