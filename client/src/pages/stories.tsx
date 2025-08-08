export default function Stories() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories of Change</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real impact. Real people. Hear inspiring stories from communities and individuals whose lives have been transformed through Access Global Foundation's programs.
          </p>
        </div>

        {/* Featured Stories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Story 1 - Education */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1544279151-6e4e999de2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Young girl studying with books" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">From Village to University</h3>
              <p className="text-gray-600 mb-4">
                Through our Global Education Initiative scholarship program, Maria from rural Guatemala became the first in her family to attend university. Today, she's studying to become a teacher to give back to her community.
              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Guatemala, Central America</span>
              </div>
            </div>
          </div>

          {/* Story 2 - Environmental */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1569163139394-de44cb55b7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Community tree planting project" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Green Revolution in Action</h3>
              <p className="text-gray-600 mb-4">
                The Nairobi community came together for our Environmental Empowerment project, planting over 5,000 trees and creating a sustainable waste management system that now serves as a model for neighboring areas.
              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Story 3 - Economic Access */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Women entrepreneurs working together" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Empowering Women Entrepreneurs</h3>
              <p className="text-gray-600 mb-4">
                Our Economic Access program provided microfinance and mentorship to 50 women in rural Bangladesh. Their collective businesses now employ over 200 people and have transformed their local economy.
              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Impact Story */}
        <div className="bg-gradient-to-r from-primary-50 to-warning-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Community That Health Built</h2>
              <p className="text-gray-600 mb-4">
                In 2020, we partnered with the remote village of Beira in Mozambique to establish their first permanent health clinic. What started as a Health & Wellness Access initiative has transformed into a comprehensive community health program.
              </p>
              <p className="text-gray-600 mb-4">
                Today, the clinic serves 15 surrounding villages and has trained 25 local health workers. Infant mortality rates have dropped by 60%, and the clinic has become a beacon of hope for sustainable healthcare in the region.
              </p>
              <p className="text-gray-600 mb-6 italic">
                "Before the clinic, we had to travel three days to reach the nearest hospital. Now, we have hope and health care right here in our village." - António Silva, Village Elder
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">15</div>
                  <div className="text-sm text-gray-600">Villages Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">25</div>
                  <div className="text-sm text-gray-600">Health Workers Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">60%</div>
                  <div className="text-sm text-gray-600">Reduction in Infant Mortality</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Health clinic with community members" 
                className="rounded-xl shadow-lg w-full" 
              />
            </div>
          </div>
        </div>

        {/* Global Impact Visualization */}
        <div className="bg-gray-900 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Global Impact Map</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <i className="fas fa-globe-americas text-warning-500 text-3xl mb-3"></i>
              <div className="text-2xl font-bold mb-1">45+</div>
              <div className="text-gray-400 text-sm">Countries Reached</div>
            </div>
            <div>
              <i className="fas fa-users text-success-500 text-3xl mb-3"></i>
              <div className="text-2xl font-bold mb-1">500K+</div>
              <div className="text-gray-400 text-sm">Lives Transformed</div>
            </div>
            <div>
              <i className="fas fa-handshake text-primary-500 text-3xl mb-3"></i>
              <div className="text-2xl font-bold mb-1">1,200+</div>
              <div className="text-gray-400 text-sm">Local Partnerships</div>
            </div>
            <div>
              <i className="fas fa-heart text-red-500 text-3xl mb-3"></i>
              <div className="text-2xl font-bold mb-1">850+</div>
              <div className="text-gray-400 text-sm">Active Projects</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-warning-500 text-xl font-semibold italic">The World is Yours.</p>
          </div>
        </div>

        {/* Community Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <blockquote className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primary-500">
            <p className="text-gray-600 mb-4 italic text-lg">
              "Access Global Foundation doesn't just provide help—they empower communities to create their own solutions. Their approach is truly transformational."
            </p>
            <cite className="text-primary-600 font-semibold">Dr. Priya Sharma, Community Health Director, India</cite>
          </blockquote>
          <blockquote className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-success-500">
            <p className="text-gray-600 mb-4 italic text-lg">
              "Working with Access Global Foundation has opened doors we never knew existed. They believe in us and help us believe in ourselves."
            </p>
            <cite className="text-success-600 font-semibold">Carlos Rodriguez, Small Business Owner, Peru</cite>
          </blockquote>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Be Part of the Next Story</h2>
          <p className="text-xl mb-8 opacity-90">
            Your support creates these life-changing stories. Join us in building a world where opportunity is accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/donate" 
              className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 inline-block"
            >
              <i className="fas fa-heart mr-2"></i> Support Our Mission
            </a>
            <a 
              href="/get-involved" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4 rounded-lg font-semibold transition-all inline-block"
            >
              <i className="fas fa-hands-helping mr-2"></i> Get Involved
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}