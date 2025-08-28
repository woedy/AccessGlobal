export default function Stories() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/assets/access_logo.jpg" 
              alt="Access Global Foundation Logo" 
              className="h-16 w-auto mx-auto mb-6 rounded-full shadow-lg"
            />
          </div>
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
              src="https://images.pexels.com/photos/8457971/pexels-photo-8457971.jpeg" 
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
              src="https://plus.unsplash.com/premium_photo-1664301311322-e778de6426f8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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
          {/* Story 4 - Refugee Education */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Refugee student studying" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">From Refugee Camp to Medical School</h3>
              <p className="text-gray-600 mb-4">
              Amara fled conflict in South Sudan at age 12. Through our Global Education Initiative, she received not just a scholarship but also digital literacy training and mentorship. Today, at 22, she's in her final year of medical school and plans to return to serve refugees. "Education gave me wings when the world tried to clip them," she says. Her younger siblings are now also in our program.              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Kakuma Refugee Camp, Kenya</span>
              </div>
            </div>
          </div>
          {/* Story 5 - Environmental Sustainability */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Sustainable farming and water conservation" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">From Drought to Abundance</h3>
              <p className="text-gray-600 mb-4">
              The village of Khimsar was facing its worst drought in 50 years. Our Environmental Empowerment program introduced rainwater harvesting, drought-resistant crops, and community-managed water systems. Within two years, they not only achieved water security but became a model eco-village. The community now trains other villages and has reduced water usage by 40% while increasing crop yields by 65%.     </p>         <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Rajasthan, India</span>
              </div>
            </div>
          </div>
          {/* Story 6 - Interfaith Unity */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Interfaith dialogue and community unity" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Building Bridges, Breaking Hatred</h3>
              <p className="text-gray-600 mb-4">
              Our antisemitism prevention program brought together communities from Rwanda and Germany for a groundbreaking reconciliation initiative. Through shared workshops, cultural exchanges, and joint community projects, participants built lasting friendships and understanding. The program has since expanded to 12 countries, creating a network of peacebuilders committed to combating hatred and discrimination.     </p>         <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Kigali, Rwanda & Berlin, Germany</span>
              </div>
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