import { useParams, Link } from 'react-router-dom';
import { TeamMember } from './about';

// This would typically come from an API or shared data
const teamMembers: TeamMember[] = [
  {
    id: 'john-doe',
    name: 'John Doe',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 15+ years of experience in non-profit management and community development. John has dedicated his career to creating sustainable solutions for underprivileged communities around the world. His leadership has been instrumental in expanding our reach to over 30 countries.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  // Add other team members here...
];

export default function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();

  // Find the team member by ID
  const member = teamMembers.find(member => member.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
          <Link to="/about" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Our Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-success-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/about" className="text-white hover:text-gray-100 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Team
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Our Team</h1>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Team Member Image */}
            <div className="md:w-1/3 lg:w-2/5">
              <img 
                className="h-full w-full object-cover" 
                src={member.image} 
                alt={member.name} 
              />
            </div>
            
            {/* Team Member Details */}
            <div className="p-8 md:w-2/3 lg:w-3/5">
              <div className="flex flex-col h-full">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{member.name}</h2>
                  <p className="text-xl text-primary-600 font-medium mt-1">{member.role}</p>
                  
                  <div className="mt-6 space-y-4 text-gray-700">
                    <p className="text-lg leading-relaxed">{member.bio}</p>
                    
                    {/* Additional details */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Areas of Expertise</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {['Non-profit Management', 'Leadership', 'Community Development', 'Strategic Planning'].map((skill) => (
                          <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Connect with {member.name.split(' ')[0]}</h3>
                  <div className="mt-4 flex space-x-4">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {member.twitter && (
                      <a 
                        href={member.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    <a 
                      href="mailto:contact@accessglobal.org" 
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <span className="sr-only">Email</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">More About {member.name.split(' ')[0]}</h3>
          <div className="prose max-w-none text-gray-700">
            <p>
              {member.name} brings a wealth of experience and expertise to their role at Access Global Foundation. With a passion for {['social impact', 'community development', 'education', 'sustainability'].slice(0, 2).join(' and ')}, they have been instrumental in driving our mission forward.
            </p>
            <p className="mt-4">
              Their leadership style emphasizes collaboration, innovation, and measurable impact. Under their guidance, our organization has been able to expand its reach and deepen its impact in communities around the world.
            </p>
            <p className="mt-4">
              When not working on foundation initiatives, {member.name.split(' ')[0]} enjoys {['reading', 'traveling', 'hiking', 'mentoring young professionals'].slice(0, 2).join(' and ')}. They hold a degree in a relevant field from a prestigious university and frequently speak at conferences about {['sustainable development', 'social entrepreneurship', 'global education'].slice(0, 1)[0]}.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
