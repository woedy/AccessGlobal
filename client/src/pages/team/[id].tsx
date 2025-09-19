import { Link, useRoute } from 'wouter';
import { Helmet } from 'react-helmet';
import { TeamMember } from '../about';
import { useState, useEffect } from 'react';

// This would typically come from an API or shared data
const teamMembers: TeamMember[] = [
  {
    id: 'dhalia-sabeh',
    name: 'Dhalia Sabeh',
    role: 'Director of Education & Training',
    bio: `Education and counseling professional with extensive experience in organizational leadership and community service. Currently pursuing a Doctor of Education in Organizational Change and Leadership at the University of Southern California (expected 2027).


EDUCATION
• Doctor of Education in Organizational Change and Leadership - University of Southern California (Candidate 2027)
• Ordination Program - Dominion Theological Seminary (2025)
• Diploma in Apostolic and Ministry - Dominion Theological Seminary (2024)
• M.A. in Guidance and Counseling - University of Ghana (2017)
• B.Sc. in Business Administration - University of Phoenix (2007)


PROFESSIONAL HIGHLIGHTS
• Extensive training in cultural diversity, harm reduction, and motivational interviewing
• Certified in First Aid and CPR (2022)
• Experienced in project management and leadership development
• Specialized in faith-based education and counseling


Dhalia brings a wealth of knowledge in educational leadership and community development to our team.`,    
    image: '/assets/Dhalia Sabeh.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    awards: [
      "County of San Mateo, Caminar - Director of Services' Outstanding Services",
      'County of San Matteo, Caminar - Team Spirit Award',
      'County of San Francisco, Family Service Agency - Documentation Excellence',
      'Action Chapel International, Prayer Cathedral - The MVP',
      'Dominion Christian Academy - Customer Service Award',
      'Outstanding Administrative Employee - Caminar'
    ],
    gallery: [
      '/assets/optimized_gallery/IMG-20250917-WA0004.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0005.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0009.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0011.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0015.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0017.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0019.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0022.webp',
      '/assets/optimized_gallery/IMG-20250917-WA0025.webp'
    ]
  }
];

export default function TeamMemberPage() {
  const [match, params] = useRoute('/team/:id');
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Find the team member by ID
  const member = teamMembers.find(member => member.id === params?.id);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
    // Disable body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  const navigate = (navDirection: 'prev' | 'next') => {
    if (!member?.gallery || isAnimating) return;
    
    setIsAnimating(true);
    setDirection(navDirection === 'next' ? 'right' : 'left');
    
    // Wait for the fade-out animation to complete before changing the image
    setTimeout(() => {
      if (navDirection === 'next') {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === member.gallery!.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? member.gallery!.length - 1 : prevIndex - 1
        );
      }
      
      // Allow the next animation after a short delay
      setTimeout(() => setIsAnimating(false), 50);
    }, 300); // This should match the CSS transition duration
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      } else if (e.key === 'ArrowLeft') {
        navigate('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex]);

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
      <Helmet>
        <title>{member.name} | {member.role} - Access Global Foundation</title>
        <meta name="description" content={`Learn more about ${member.name}, ${member.role} at Access Global Foundation`} />
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-success-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/about" className="text-white hover:text-gray-100 flex items-center">
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
                    <div className="text-lg leading-relaxed whitespace-pre-line">
                    {member.bio}
                  </div>
                    
                    {/* Additional details can be added here */}
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
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    <a 
                      href="mailto:contact@accessglobal.org" 
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <span className="sr-only">Email</span>
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

        {/* Gallery Section */}
        {member.gallery && member.gallery.length > 0 && (
          <div className="border-t border-gray-200 px-8 py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {member.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image}
                    alt={`${member.name} - Gallery ${index + 1}`}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox */}
            {isOpen && member.gallery && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300">
                <button 
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 focus:outline-none transition-all duration-300 hover:scale-110"
                  aria-label="Close gallery"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => navigate('prev')}
                  className="absolute left-4 md:left-8 z-10 text-white hover:text-gray-300 focus:outline-none transition-all duration-300 hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="relative max-w-4xl w-full h-full flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      key={currentImageIndex}
                      src={member.gallery[currentImageIndex]}
                      alt={`${member.name} - Gallery ${currentImageIndex + 1}`}
                      className={`max-h-[90vh] max-w-full object-contain transition-all duration-300 ease-in-out ${
                        isAnimating 
                          ? direction === 'right' 
                            ? 'opacity-0 translate-x-12' 
                            : 'opacity-0 -translate-x-12'
                          : 'opacity-100 translate-x-0'
                      }`}
                    />
                  </div>
                  
                  <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full transition-opacity duration-300 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {currentImageIndex + 1} / {member.gallery.length}
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('next')}
                  className="absolute right-4 md:right-8 z-10 text-white hover:text-gray-300 focus:outline-none transition-all duration-300 hover:scale-110"
                  aria-label="Next image"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Animation overlay */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .lightbox-enter {
                      opacity: 0;
                      transform: scale(0.9);
                    }
                    .lightbox-enter-active {
                      opacity: 1;
                      transform: scale(1);
                      transition: opacity 300ms, transform 300ms;
                    }
                    .lightbox-exit {
                      opacity: 1;
                      transform: scale(1);
                    }
                    .lightbox-exit-active {
                      opacity: 0;
                      transform: scale(0.9);
                      transition: opacity 300ms, transform 300ms;
                    }
                  `
                }} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
