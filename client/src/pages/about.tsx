export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  awards?: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'dhalia-sabeh',
    name: 'Dhalia Sabeh',
    role: 'Director of Education & Training',
    bio: 'Education and counseling professional with extensive experience in organizational leadership and community service.',
    image: '/assets/Dhalia Sabeh.jpg',  // Image should be in public/assets/ directory
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    awards: [
      "County of San Mateo, Caminar - Director of Services' Outstanding Services",
      'Outstanding Administrative Employee - Caminar'
    ]
  }
];

import { useLocation } from 'wouter';
import React from 'react';

export default function About() {
  const [_, navigate] = useLocation();
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

        {/* Team Section */}
        <div className="py-16 bg-gray-50 rounded-2xl mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate individuals dedicated to making a global impact through education and community development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {teamMembers.map((member: TeamMember) => (
                <div 
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => navigate(`/team/${member.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-primary-600 font-medium">{member.role}</p>
                    <p className="text-gray-600 mt-2 line-clamp-2">{member.bio}</p>
                    <div className="mt-4 flex space-x-4">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-primary-500 transition-colors"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a 
                          href={member.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/team"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
              >
                View Full Team
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
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
