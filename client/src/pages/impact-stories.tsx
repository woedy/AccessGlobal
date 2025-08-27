export default function ImpactStories() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Impact Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories of transformation and hope from the communities we serve
          </p>
        </div>

        {/* Featured Stories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Story 1 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1544279151-6e4e999de2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Young girl in school uniform" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Amara's Educational Journey</h3>
              <p className="text-gray-600 mb-4">
                Thanks to our school construction program in Sierra Leone, Amara now has access to quality education. She dreams of becoming a doctor to serve her community.
              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Sierra Leone, West Africa</span>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Healthcare worker with mother and child" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maria's Second Chance</h3>
              <p className="text-gray-600 mb-4">
                Our mobile health clinic reached Maria just in time during her complicated pregnancy. Today, both she and her healthy baby boy are thriving.
              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Guatemala, Central America</span>
              </div>
            </div>
          </div>

          {/* Story 3 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Community gathering" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kibera's Transformation</h3>
              <p className="text-gray-600 mb-4">
                Through our integrated community development program, Kibera has seen remarkable improvements in safety, education, and economic opportunities.
              </p>
              <div className="flex items-center text-sm text-primary-500">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>Kibera, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Story */}
        <div className="bg-gradient-to-r from-primary-50 to-success-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Village That Education Built</h2>
              <p className="text-gray-600 mb-4">
                In 2018, we partnered with the community of Nyagatare in Rwanda to build their first primary school. What started as a simple educational project has transformed into something extraordinary.
              </p>
              <p className="text-gray-600 mb-4">
                Today, the school serves 400 children from surrounding villages. But the impact goes far beyond education. The school has become a community hub, hosting health clinics, adult literacy classes, and agricultural training programs.
              </p>
              <p className="text-gray-600 mb-6">
                "Before the school, our children had to walk 10 kilometers to the nearest education facility. Now, they have hope for the future right here in our village," says Jean Baptiste, a local farmer and father of three.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">400</div>
                  <div className="text-sm text-gray-600">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">95%</div>
                  <div className="text-sm text-gray-600">Graduation Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">12</div>
                  <div className="text-sm text-gray-600">Teachers Trained</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="School children celebrating" 
                className="rounded-xl shadow-lg w-full" 
              />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-primary-50 to-success-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Partners Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <blockquote className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4 italic">
                "Access Global Foundation doesn't just provide aid—they empower communities to create lasting change. Their approach is truly transformational."
              </p>
              <cite className="text-primary-600 font-semibold">Dr. James Kimani, Local Health Director</cite>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4 italic">
                "Working with AGF has been incredible. They listen to our community's needs and work with us to build solutions that last."
              </p>
              <cite className="text-primary-600 font-semibold">Elena Rodriguez, Community Leader</cite>
            </blockquote>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Watch Our Impact in Action</h2>
          <p className="text-gray-600 mb-8">See how your support creates lasting change in communities worldwide</p>
          <div className="bg-gray-200 rounded-xl h-64 lg:h-96 flex items-center justify-center">
            <div className="text-center">
              <i className="fas fa-play-circle text-6xl text-primary-500 mb-4"></i>
              <p className="text-gray-600">Impact Stories Video</p>
              <p className="text-sm text-gray-500">Click to play our latest documentary</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
