export default function About() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Access Global Foundation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in a world where every individual, regardless of
            background or geography, has the opportunity to thrive.
          </p>
          <p className="text-2xl font-bold text-warning-500 mt-4 italic">
            The World is Yours.
          </p>
        </div>

        {/* Who We Are */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              Access Global Foundation is a non-profit organization Founded by a
              diverse group of global development professionals, educators, and
              community leaders dedicated to empowering communities through
              global access to education, resources, and sustainable development
              opportunities. Founded on the principle that barriers should never
              define destiny, we work tirelessly to unlock potential and create
              pathways to success across the globe.
            </p>
            <p className="text-gray-600 mb-4">
              Our approach is rooted in partnership, not charity. We work
              alongside local communities to identify their unique needs and
              co-create solutions that are culturally relevant and sustainable.
              From establishing digital learning centers in rural Kenya to
              supporting women's cooperatives in Guatemala, our work spans
              continents while remaining deeply personal and community-driven.
            </p>
            <p className="text-gray-600 mb-4">
              Central to our mission is fighting antisemitism and all forms of
              discrimination. We actively support Holocaust education programs,
              interfaith dialogue initiatives, and community healing projects
              that address historical prejudices. We believe that combating
              hatred in all its forms is fundamental to creating the equitable
              access we champion worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that with the right tools, support, and opportunities,
              every person can shape their future and contribute to a better
              world.
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

        {/*Our Story*/}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Diverse volunteers working together"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="font-bold  mb-3">The Beginning </p>
            <p className="text-gray-600 mb-8">
              Access Global Foundation was born in 2018 when our founder, Sarah
              Johnson, witnessed firsthand the untapped potential in a remote
              village in Madagascar. Despite having brilliant minds and strong
              community bonds, residents lacked access to basic educational
              resources and sustainable economic opportunities. This experience
              sparked a vision: what if we could systematically remove barriers
              that prevent communities from thriving?
            </p>
            <p className="font-bold  mb-3">Growing Impact </p>

            <p className="text-gray-600 mb-4">
              What began as a single education initiative has grown into a
              comprehensive foundation addressing interconnected challenges.
              We've learned that sustainable change requires a holistic
              approach—combining education with economic opportunity,
              environmental stewardship with health access, and local wisdom
              with global resources.
            </p>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 bg-primary-50 rounded-xl">
            <i className="fas fa-eye text-primary-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              A world where every person has the power and opportunity to define
              their future.
            </p>
          </div>
          <div className="text-center p-8 bg-success-50 rounded-xl">
            <i className="fas fa-bullseye text-success-500 text-3xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To create pathways to opportunity by breaking down barriers and
              promoting equitable access to tools that change lives.
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

        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced leaders committed to creating positive change
              worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sarah Johnson
              </h3>
              <p className="text-primary-500 mb-2">Executive Director</p>
              <p className="text-gray-600 text-sm">
                Sarah brings over two decades of experience in international
                development, having worked with UNICEF and Doctors Without
                Borders across four continents. She holds a Master's in
                International Relations from Oxford and speaks five languages.
                Her leadership philosophy centers on "leading by
                listening"—ensuring that community voices guide every
                initiative.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Dr. Michael Chen
              </h3>
              <p className="text-primary-500 mb-2">Program Director</p>
              <p className="text-gray-600 text-sm">
                A former World Health Organization advisor, Dr. Chen specialized
                in designing scalable health interventions for underserved
                populations. His innovative community health worker training
                programs have been adopted by governments across Southeast Asia.
                He brings both clinical expertise and deep understanding of
                cultural nuances in health delivery.{" "}
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Amina Okafor
              </h3>
              <p className="text-primary-500 mb-2">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Amina's expertise in sustainable development stems from her work
                with the African Development Bank and her PhD in Environmental
                Economics. She pioneered our community-partnership model and
                oversees our environmental and agricultural programs. Her
                approach combines rigorous impact measurement with genuine
                community engagement.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mt-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Our Impact by the Numbers
            </h2>
            <p className="text-xl opacity-90">
              Measurable change in communities worldwide
            </p>
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

        {/* Our Approach */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
          </div>

          {/* Core Values */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-green-50 rounded-xl">
              <i className="fas fa-fist-raised text-green-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Community-Centered Design
              </h3>
              <p className="text-gray-600">
                Every program begins with extensive community consultation. We
                spend months understanding local needs, cultural dynamics, and
                existing resources before designing interventions. This ensures
                our programs are relevant, respectful, and sustainable.
              </p>
            </div>
            <div className="text-center p-8 bg-blue-50 rounded-xl">
              <i className="fas fa-leaf text-blue-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Capacity Building
              </h3>
              <p className="text-gray-600">
                Rather than creating dependency, we focus on building local
                capacity. We train community members to become leaders,
                teachers, and advocates. Our goal is to work ourselves out of a
                job in each community we serve.
              </p>
            </div>
            <div className="text-center p-8 bg-blue-50 rounded-xl">
              <i className="fas fa-leaf text-blue-500 text-3xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Measuring What Matters
              </h3>
              <p className="text-gray-600">
                We track both quantitative outcomes and qualitative changes.
                While numbers tell part of the story, we also measure shifts in
                community confidence, leadership development, and long-term
                sustainability of our interventions.
              </p>
            </div>
          </div>
        </div>

        {/* Partnerships & Collaborations */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Some of Our Works
            </h2>
          </div>
          {/* Program Categories */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Children in classroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Children in classroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Children in classroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Children in classroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Children in classroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Children in classroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
