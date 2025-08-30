export default function About() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/assets/access_logo.jpg" 
              alt="Access Global Foundation Logo" 
              className="h-80 w-auto mx-auto mb-6 rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Access Global Foundation
          </h1>
     

        </div>

        {/* Who We Are */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              Access Global Foundation is a newly established non-profit organization. We are building a team of
              global development professionals, educators, and
              community leaders dedicated to empowering communities through
              global access to education, resources, and sustainable development
              opportunities. Founded on the principle that barriers should never
              define destiny, we are committed to unlocking potential and creating
              pathways to success across the globe.
            </p>
            <p className="text-gray-600 mb-4">
              Our approach will be rooted in partnerships. We plan to work
              alongside local communities to identify their unique needs and
              co-create solutions that are culturally relevant and sustainable.
              From establishing digital learning centers in rural areas to
              supporting women's cooperatives in Ghana, our vision spans
              continents while remaining deeply personal and community-driven.
            </p>

            <p className="text-gray-600 mb-4">
              We believe that with the right tools, support, and opportunities,
              every person can shape their future and contribute to a better
              world.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Diverse volunteers working together"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>

        {/*Our Story*/}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.pexels.com/photos/9493593/pexels-photo-9493593.jpeg"
              alt="Interfaith dialogue and community unity"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="font-bold text-lg text-primary-600 mb-4">Fighting Antisemitism & Building Unity</p>

            <p className="text-gray-600 mb-4">
              Central to our mission from day one is fighting antisemitism and all forms of
              discrimination. We are launching Holocaust education programs,
              interfaith dialogue initiatives, and community healing projects
              that address historical prejudices. We believe that combating
              hatred in all its forms is fundamental to creating the equitable
              access we champion worldwide.
            </p>

            <p className="text-gray-600 mb-4">
              Our antisemitism prevention work will include comprehensive Holocaust education 
              programs in schools and communities, interfaith dialogue workshops that bring 
              together religious and community leaders, and digital platforms that promote 
              understanding and combat online hate speech. We are building partnerships with museums, 
              educational institutions, and community organizations to ensure that the 
              lessons of history are never forgotten.
            </p>

            <p className="text-gray-600 mb-4">
              We also plan to support initiatives that address contemporary antisemitism through 
              cultural exchange programs, youth leadership development, and community 
              resilience building. By fostering understanding and respect between different 
              communities, we'll create stronger, more inclusive societies where every individual 
              can thrive regardless of their background or beliefs.
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

   
        {/* Impact Numbers */}
        <div className="mt-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Our Vision for Impact
            </h2>
            <p className="text-xl opacity-90">
              Ambitious targets to achieve over the next five years
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100</div>
              <div className="opacity-90">Countries to Reach</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500</div>
              <div className="opacity-90">Communities to Serve</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300</div>
              <div className="opacity-90">Schools to Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000</div>
              <div className="opacity-90">Lives to Transform</div>
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
                Every program will begin with extensive community consultation. We
                plan to spend months understanding local needs, cultural dynamics, and
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
                Rather than creating dependency, we'll focus on building local
                capacity. We plan to train community members to become leaders,
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

    
      </div>
    </div>
  );
}
