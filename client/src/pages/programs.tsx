export default function Programs() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive initiatives designed to unlock potential and create pathways to opportunity across the globe
          </p>
        </div>

        {/* Program Categories */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Global Education Initiatives */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <i className="fas fa-globe-americas text-success-500 text-3xl mr-4"></i>
              <h2 className="text-2xl font-bold text-gray-900">Global Education Initiatives</h2>
            </div>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-success-500 mt-1 mr-3"></i>
                <span>Scholarships for underserved students</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-success-500 mt-1 mr-3"></i>
                <span>Digital literacy and technology access</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-success-500 mt-1 mr-3"></i>
                <span>School infrastructure development</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-success-500 mt-1 mr-3"></i>
                <span>Teacher training in underserved regions</span>
              </li>
            </ul>
            <img 
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Children in classroom" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>

          {/* Environmental Empowerment */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <i className="fas fa-leaf text-green-500 text-3xl mr-4"></i>
              <h2 className="text-2xl font-bold text-gray-900">Environmental Empowerment</h2>
            </div>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Community-based tree planting projects</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Clean water access infrastructure</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Sustainable waste management systems</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Environmental awareness education</span>
              </li>
            </ul>
            <img 
              src="https://images.unsplash.com/photo-1569163139394-de44cb55b7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Environmental projects" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>

          {/* Economic Access & Entrepreneurship */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <i className="fas fa-chart-line text-primary-500 text-3xl mr-4"></i>
              <h2 className="text-2xl font-bold text-gray-900">Economic Access & Entrepreneurship</h2>
            </div>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Skills training and development programs</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Microfinance support for small businesses</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Mentorship for youth entrepreneurs</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-primary-500 mt-1 mr-3"></i>
                <span>Women's economic empowerment initiatives</span>
              </li>
            </ul>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Entrepreneurship training" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>

          {/* Health & Wellness Access */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <i className="fas fa-heartbeat text-red-500 text-3xl mr-4"></i>
              <h2 className="text-2xl font-bold text-gray-900">Health & Wellness Access</h2>
            </div>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-red-500 mt-1 mr-3"></i>
                <span>Mobile health clinics and outreach</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-red-500 mt-1 mr-3"></i>
                <span>Health awareness programs</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-red-500 mt-1 mr-3"></i>
                <span>Partnerships for medicine delivery</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-red-500 mt-1 mr-3"></i>
                <span>Medical aid and emergency response</span>
              </li>
            </ul>
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Mobile health clinic" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
        </div>

        {/* Current Projects */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Current Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 p-6 rounded-xl mb-4">
                <i className="fas fa-school text-primary-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-gray-900">Kenya Education Initiative</h3>
                <p className="text-sm text-gray-600 mt-2">Building 15 new schools in rural areas</p>
              </div>
              <div className="text-sm text-gray-500">Progress: 78%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-red-50 p-6 rounded-xl mb-4">
                <i className="fas fa-ambulance text-red-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-gray-900">Guatemala Health Program</h3>
                <p className="text-sm text-gray-600 mt-2">Mobile clinics serving 50 villages</p>
              </div>
              <div className="text-sm text-gray-500">Progress: 92%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-warning-50 p-6 rounded-xl mb-4">
                <i className="fas fa-tint text-warning-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-gray-900">Bangladesh Water Project</h3>
                <p className="text-sm text-gray-600 mt-2">Clean water access for 10,000 people</p>
              </div>
              <div className="text-sm text-gray-500">Progress: 45%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
