import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ImpactCounter from "@/components/impact-counter";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        ></div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to<br />
            <span className="text-warning-500">Access Global Foundation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto">
            We believe in a world where every individual, regardless of background or geography, has the opportunity to thrive.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-warning-500 mb-8 italic">
            The World is Yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-warning-500 hover:bg-warning-600 text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                <i className="fas fa-heart mr-2"></i> Donate Now
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all">
                <i className="fas fa-hands-helping mr-2"></i> Get Involved
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactCounter target={45} label="Countries Reached" />
            <ImpactCounter target={500} label="Lives Transformed" />
            <ImpactCounter target={1200} label="Local Partnerships" />
            <ImpactCounter target={850} label="Active Projects" />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            To create pathways to opportunity by breaking down barriers in underserved communities and promoting equitable access to tools that change lives. Access Global Foundation is committed to unlocking potential and opening doors — socially, economically, and educationally — across the globe.
          </p>
          <div className="bg-gradient-to-r from-primary-50 to-warning-50 p-8 rounded-2xl">
            <blockquote className="text-2xl font-medium text-gray-800 italic">
              "The world is yours. Let's make it accessible."
            </blockquote>
            <cite className="text-primary-600 font-semibold mt-4 block">- Access Global Foundation</cite>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive initiatives designed to address critical needs and create lasting impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Global Education Initiatives */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Children learning in classroom" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <i className="fas fa-globe-americas text-success-500 text-xl mr-3"></i>
                  <h3 className="text-xl font-semibold text-gray-900">Global Education</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Scholarships, digital literacy, school infrastructure, and teacher training in underserved regions.
                </p>
                <Link href="/programs" className="text-primary-500 hover:text-primary-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Environmental Empowerment */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1569163139394-de44cb55b7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Tree planting and environmental work" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <i className="fas fa-leaf text-green-500 text-xl mr-3"></i>
                  <h3 className="text-xl font-semibold text-gray-900">Environmental Empowerment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Community-based sustainability projects: tree planting, clean water access, and waste management.
                </p>
                <Link href="/programs" className="text-primary-500 hover:text-primary-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Economic Access & Entrepreneurship */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Entrepreneurship and business training" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <i className="fas fa-chart-line text-primary-500 text-xl mr-3"></i>
                  <h3 className="text-xl font-semibold text-gray-900">Economic Access</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Skills training, microfinance support, and mentorship for youth and women entrepreneurs.
                </p>
                <Link href="/programs" className="text-primary-500 hover:text-primary-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Health & Wellness Access */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Mobile health clinic" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <i className="fas fa-heartbeat text-red-500 text-xl mr-3"></i>
                  <h3 className="text-xl font-semibold text-gray-900">Health & Wellness</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mobile clinics, health awareness programs, and partnerships for medicine and medical aid delivery.
                </p>
                <Link href="/programs" className="text-primary-500 hover:text-primary-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-success-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of supporters who are creating positive change in communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105">
                <i className="fas fa-heart mr-2"></i> Start Donating
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4 text-lg font-semibold transition-all">
                <i className="fas fa-users mr-2"></i> Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
