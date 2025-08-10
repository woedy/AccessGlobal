import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function GetInvolved() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Involved</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in creating pathways to opportunity worldwide. Every contribution makes a difference.
          </p>
          <p className="text-2xl font-bold text-warning-500 mt-4 italic">The World is Yours.</p>
        </div>

        {/* Ways to Get Involved */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Volunteer */}
          <div className="bg-primary-50 rounded-xl p-8 text-center">
            <i className="fas fa-hands-helping text-primary-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Volunteer</h3>
            <p className="text-gray-600 mb-6">
              Dedicate your time and skills to make a direct impact in communities around the world.
            </p>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              <i className="fas fa-user-plus mr-2"></i> Volunteer Now
            </Button>
          </div>

          {/* Donate */}
          <div className="bg-warning-50 rounded-xl p-8 text-center">
            <i className="fas fa-heart text-warning-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Donate</h3>
            <p className="text-gray-600 mb-6">
              Your financial support helps us reach more communities and expand our programs.
            </p>
            <Link href="/donate">
              <Button className="bg-warning-500 hover:bg-warning-600 text-white">
                <i className="fas fa-heart mr-2"></i> Donate Today
              </Button>
            </Link>
          </div>

          {/* Partner */}
          <div className="bg-success-50 rounded-xl p-8 text-center">
            <i className="fas fa-handshake text-success-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Partner</h3>
            <p className="text-gray-600 mb-6">
              Collaborate with us as an organization to amplify our collective impact.
            </p>
            <Button className="bg-success-500 hover:bg-success-600 text-white">
              <i className="fas fa-building mr-2"></i> Become a Partner
            </Button>
          </div>

          {/* Fundraise */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <i className="fas fa-trophy text-blue-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fundraise</h3>
            <p className="text-gray-600 mb-6">
              Organize fundraising events in your community to support our mission.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <i className="fas fa-calendar-alt mr-2"></i> Start Fundraising
            </Button>
          </div>

          {/* Advocate */}
          <div className="bg-purple-50 rounded-xl p-8 text-center">
            <i className="fas fa-bullhorn text-purple-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advocate</h3>
            <p className="text-gray-600 mb-6">
              Use your voice and platform to spread awareness about our cause.
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              <i className="fas fa-share-alt mr-2"></i> Share Our Mission
            </Button>
          </div>

          {/* Corporate Giving */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <i className="fas fa-building text-gray-600 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Corporate Giving</h3>
            <p className="text-gray-600 mb-6">
              Engage your employees and customers through corporate social responsibility.
            </p>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">
              <i className="fas fa-briefcase mr-2"></i> Corporate Programs
            </Button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Get updates on our programs, success stories, and ways to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-primary-500 hover:bg-gray-100">
              <i className="fas fa-envelope mr-2"></i> Subscribe
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary-500 w-6 mr-3"></i>
                <span className="text-gray-600">volunteer@accessglobal.org</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-primary-500 w-6 mr-3"></i>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary-500 w-6 mr-3 mt-1"></i>
                <span className="text-gray-600">  1629 k street NW #300<br />Washington DC, 20006</span>
              </div>
            </div>
          </div>
        
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-primary-500 text-black rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-primary-500 text-black rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-primary-500 text-black rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-primary-500 text-black rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}