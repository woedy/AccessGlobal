export default function About() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Access Global Foundation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in a world where every individual, regardless of background or geography, has the opportunity to thrive.
          </p>
          <p className="text-2xl font-bold text-warning-500 mt-4 italic">The World is Yours.</p>
        </div>

        {/* Who We Are */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Access Global Foundation is a non-profit organization dedicated to empowering communities through global access to education, resources, and sustainable development opportunities.
            </p>
            <p className="text-gray-600 mb-4">
              Founded on the principle that barriers should never define destiny, we work tirelessly to unlock potential and create pathways to success across the globe. From remote villages to urban centers, our programs reach communities that need it most.
            </p>
            <p className="text-gray-600">
              We believe that with the right tools, support, and opportunities, every person can shape their future and contribute to a better world.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Diverse volunteers working together" 
              className="rounded-xl shadow-lg w-full" 
            />
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 bg-primary-50 rounded-xl">
            <i className="fas fa-eye text-primary-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              A world where every person has the power and opportunity to define their future.
            </p>
          </div>
          <div className="text-center p-8 bg-success-50 rounded-xl">
            <i className="fas fa-bullseye text-success-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To create pathways to opportunity by breaking down barriers and promoting equitable access to tools that change lives.
            </p>
          </div>
          <div className="text-center p-8 bg-warning-50 rounded-xl">
            <i className="fas fa-key text-warning-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Access</h3>
            <p className="text-gray-600">
              Creating bridges where there are gaps
            </p>
          </div>
          <div className="text-center p-8 bg-red-50 rounded-xl">
            <i className="fas fa-balance-scale text-red-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Equity</h3>
            <p className="text-gray-600">
              Serving with fairness and inclusivity
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="text-center p-8 bg-green-50 rounded-xl">
            <i className="fas fa-fist-raised text-green-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Empowerment</h3>
            <p className="text-gray-600">
              Strengthening communities from within
            </p>
          </div>
          <div className="text-center p-8 bg-blue-50 rounded-xl">
            <i className="fas fa-leaf text-blue-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
            <p className="text-gray-600">
              Building solutions that last
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced leaders committed to creating positive change worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
              <p className="text-primary-500 mb-2">Executive Director</p>
              <p className="text-gray-600 text-sm">
                20+ years in international development and humanitarian work
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Dr. Michael Chen</h3>
              <p className="text-primary-500 mb-2">Program Director</p>
              <p className="text-gray-600 text-sm">
                Former WHO advisor with expertise in global health initiatives
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Amina Okafor</h3>
              <p className="text-primary-500 mb-2">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Expert in sustainable development and community engagement
              </p>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mt-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact by the Numbers</h2>
            <p className="text-xl opacity-90">Measurable change in communities worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="opacity-90">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250+</div>
              <div className="opacity-90">Communities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">87</div>
              <div className="opacity-90">Schools Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150K+</div>
              <div className="opacity-90">Lives Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
