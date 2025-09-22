import { Link, useRoute } from 'wouter';
import { Helmet } from 'react-helmet';
import { TeamMember } from '../about';
import { useState, useEffect, useMemo } from 'react';

// This would typically come from an API or shared data
const teamMembers: TeamMember[] = [
  {
    id: 'engel-moses',
    name: 'Engel Moses',
    role: 'Executive Director, Access Global Foundation',
    bio: `Moses is a distinguished international business consultant, technologist, and humanitarian leader dedicated to leveraging global markets, innovation, and social impact. Moses has built a multifaceted career spanning consulting, technology, and philanthropy, earning respect for his ability to merge economic opportunity with positive societal change.


PROFESSIONAL EXPERTISE
• International Business Consulting
• Technology Strategy & Innovation
• Market Entry & Expansion
• Financial Technology (FinTech)
• Blockchain & AI Applications
• Social Impact & Sustainability


CAREER HIGHLIGHTS
• Advised organizations across North America, Africa, and Europe
• Specializes in business strategy and technology-driven transformation
• Expert in navigating complex regulatory and cultural landscapes
• Early adopter and advocate of cutting-edge technologies
• Focus on transparency and financial inclusion


LEADERSHIP AT ACCESS GLOBAL FOUNDATION
• Leads the organization's vision and strategic initiatives
• Focuses on empowering vulnerable communities through:
  - Education and digital literacy
  - Healthcare access
  - Skills training
  - Infrastructure development
  - Food security programs
• Champions innovative solutions for sustainable development


THOUGHT LEADERSHIP
• Sought-after speaker at international forums and conferences
• Regular panelist on technology and development topics
• Advocate for ethical technology adoption
• Promotes business models that balance profit and purpose


CORE PHILOSOPHY
"Real leadership blends ambition with empathy. Success is not merely about financial or business victories. It is about the impact left behind: the lives lifted, the systems improved, the communities empowered."`,
    image: '/assets/Engel Moses.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    awards: [
      'Recognized international business consultant',
      'Technology and innovation thought leader',
      'Humanitarian and social impact advocate',
      'Speaker at international forums and conferences'
    ],
    gallery: [
      '/assets/Engel Moses.jpg'
    ]
  },
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
  },
  {
    id: 'levytska-oksana',
    name: 'Levytska Oksana',
    role: 'Education and Research Specialist',
    bio: `PhD, Associate Professor with extensive experience in higher education and academic research. Expert in law, philosophy, and pharmaceutical education.


EDUCATION
• PhD in Law - National University "Lviv Polytechnic" (2019)
• Associate Professor title (2021)
• Bachelor's degree in Pharmacy - Lviv National Medical University (2019)


PROFESSIONAL EXPERIENCE
• Extensive teaching experience in leading higher education institutions of Ukraine
• Lecturer in multiple disciplines including:
  - Rhetoric
  - Canon Law
  - Philosophy and Philosophy of Law
  - Sociology and Sociology of Law
  - History of Philosophy of Law
  - Pharmaceutical Law

• Taught at prestigious institutions:
  - Lviv National Medical University
  - Lviv National University of Veterinary Medicine and Biotechnologies
  - National University "Lviv Polytechnic"

• Professional experience in politics and electoral law
• Authored over 86 books, including children's literature and novels
• Creator of unique children's adventure series


CURRENT FOCUS
• Continuing academic and teaching career in France
• Authoring educational and literary works
• Contributing to international academic research`,    
    image: '/assets/Levytska Oksana.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    awards: [
      'PhD in Law (2019)',
      'Associate Professor title (2021)',
      'Published author of 86+ books',
      'Recipient of multiple academic excellence awards'
    ],
    gallery: [
      '/assets/Levytska Oksana.jpg'
    ]
  }
];

export default function TeamMemberPage() {
  const [, params] = useRoute('/team/:id');
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  // Find the team member by ID
  const member = teamMembers.find(member => member.id === params?.id);

  const firstName = useMemo(() => member?.name.split(' ')[0] ?? '', [member?.name]);
  const heroSummary = useMemo(() => {
    if (!member?.bio) return '';
    return member.bio
      .split('\n\n')[0]
      .replace(/\s+/g, ' ')
      .trim();
  }, [member?.bio]);

  const awardCount = member?.awards?.length ?? 0;

  const quickHighlights = useMemo(() => {
    if (!member) return [];
    return [
      {
        label: 'Role',
        value: member.role,
        icon: (
          <svg className="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
          </svg>
        )
      },
      {
        label: 'Recognitions',
        value: awardCount > 0 ? `${awardCount} Key Honor${awardCount > 1 ? 's' : ''}` : 'Impact-Driven Leadership',
        icon: (
          <svg className="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 7.5l1.5 3 3.25.375-2.5 2.25.75 3.375-3-1.875-3 1.875.75-3.375-2.5-2.25L8.25 10.5l1.5-3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75V6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 4.5l.75 2.25" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 4.5l-.75 2.25" />
          </svg>
        )
      },
      {
        label: 'Global Work',
        value: 'International Collaboration & Advocacy',
        icon: (
          <svg className="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a15.75 15.75 0 010 19.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a15.75 15.75 0 000 19.5" />
          </svg>
        )
      },
      {
        label: 'Core Strengths',
        value: 'Education • Equity • Innovation',
        icon: (
          <svg className="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8.25 4.5-8.25 4.5L3.75 7.5 12 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L3.75 7.5V12L12 16.5 20.25 12V7.5L12 12z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5L3.75 12V16.5L12 21l8.25-4.5V12L12 16.5z" />
          </svg>
        )
      }
    ];
  }, [member, awardCount]);

  const focusAreas = useMemo(() => [
    'Community Empowerment',
    'Strategic Partnerships',
    'Education Innovation',
    'Sustainable Development',
    'Leadership Mentorship',
    'Global Advocacy'
  ], []);

  const spotlightCards = useMemo(() => {
    if (!member) return [];
    return [
      {
        title: 'Visionary Leadership',
        description: `${firstName} champions inclusive solutions that center community voices and long-term impact.`,
        icon: (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
          </svg>
        )
      },
      {
        title: 'Transformative Programs',
        description: `Guides multidisciplinary teams to design programs that blend innovation, equity, and measurable outcomes.`,
        icon: (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0115 0v3.75A3.75 3.75 0 0115.75 19.5h-7.5A3.75 3.75 0 014.5 15.75V12z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v-6" />
          </svg>
        )
      },
      {
        title: 'People-First Philosophy',
        description: `${firstName}'s work centers dignity, collaboration, and sustainable change across every initiative.`,
        icon: (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21a5.25 5.25 0 0110.5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5l2.25 2.25M19.5 7.5L17.25 9.75" />
          </svg>
        )
      }
    ];
  }, [member, firstName]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
      <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold text-slate-900">Team Member Not Found</h1>
          <p className="mt-4 text-slate-600">
            We couldn't find the profile you're looking for. Explore our team to discover inspiring leaders shaping Access Global Foundation.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Our Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <Helmet>
        <title>{member.name} | {member.role} - Access Global Foundation</title>
        <meta name="description" content={`Learn more about ${member.name}, ${member.role} at Access Global Foundation`} />
      </Helmet>

      <header className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 via-white to-success-50 pb-32 pt-16">
        <div className="absolute inset-0 -z-20">
          <img src={member.image} alt="Background" className="h-full w-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-100/70 via-white to-success-100/70" />
        <div className="absolute -top-24 right-[-10%] -z-10 h-72 w-72 rounded-full bg-success-200/50 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-primary-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-slate-600">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Team
            </Link>

            <span className="uppercase tracking-[0.35em] text-xs text-slate-400">Leadership Spotlight</span>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-xs uppercase tracking-wider text-primary-600 shadow-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.6 5.26 5.81.84-4.2 4.09.99 5.78L12 16.88l-5.2 2.74.99-5.78-4.2-4.09 5.81-.84L12 3z" />
              </svg>
              {awardCount > 0 ? `${awardCount} celebrated honor${awardCount > 1 ? 's' : ''}` : 'Inspiring changemaker'}
            </div>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600 shadow-sm ring-1 ring-primary-100">
                Meet the Team
              </span>
              <h1 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">{member.name}</h1>
              <p className="mt-3 text-lg text-slate-600 md:text-xl">{member.role}</p>
              {heroSummary && (
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                  {heroSummary}
                </p>
              )}

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {quickHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-primary-100 opacity-0 transition group-hover:opacity-100" />
                    <div className="relative flex items-start gap-3 text-slate-700">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700 md:text-base">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -m-6 rounded-[2.5rem] bg-gradient-to-tr from-primary-200/40 via-white/0 to-success-200/40 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white shadow-2xl">
                <img className="h-full w-full object-cover" src={member.image} alt={member.name} />
              </div>
              <div className="absolute -bottom-8 left-1/2 flex w-max -translate-x-1/2 items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm text-slate-600 shadow-lg">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 3.5" />
                </svg>
                {firstName} inspires bold, community-powered change.
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="-mt-12 pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <section className="relative overflow-hidden rounded-3xl bg-white p-10 text-slate-900 shadow-xl ring-1 ring-slate-200/60">
              <div className="absolute right-0 top-0 hidden h-48 w-48 translate-x-20 -translate-y-20 rounded-full bg-primary-100 blur-3xl sm:block" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Biography & Story
                </span>
                <h2 className="mt-6 text-3xl font-bold text-slate-900">Championing Access for Every Community</h2>
                <div className="mt-6 space-y-4 whitespace-pre-line text-lg leading-relaxed text-slate-700">
                  {member.bio}
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {spotlightCards.map((card) => (
                    <div
                      key={card.title}
                      className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                        {card.icon}
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900">Focus Areas</h3>
                <p className="mt-2 text-sm text-slate-600">Core themes that guide {firstName}'s leadership and program design.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-medium tracking-wide text-slate-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-success-50 p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900">Connect & Collaborate</h3>
                <p className="mt-2 text-sm text-slate-600">Follow {firstName}'s work and reach out for partnerships.</p>
                <div className="mt-5 flex items-center gap-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                      </svg>
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  )}
                  <a
                    href="mailto:contact@accessglobal.org"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50"
                    aria-label={`Email ${member.name}`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900">Guiding Principles</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <svg className="mt-1 h-5 w-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Amplify local leadership and community expertise.</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="mt-1 h-5 w-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Build equitable partnerships that prioritize long-term outcomes.</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="mt-1 h-5 w-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Champion innovation that keeps dignity and inclusion at the center.</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {member.awards && member.awards.length > 0 && (
            <section className="overflow-hidden rounded-3xl bg-white p-10 text-slate-700 shadow-xl ring-1 ring-slate-200/60">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-600">
                    Signature Milestones
                  </span>
                  <h2 className="mt-6 text-3xl font-bold text-slate-900">Celebrating standout achievements</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                    {firstName}'s journey is marked by a commitment to equitable development and meaningful collaboration across borders.
                  </p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-3 top-0 h-full w-px bg-slate-200" />
                  <div className="space-y-8">
                    {member.awards.map((award, index) => (
                      <div
                        key={`${index}-${award}`}
                        className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <span className="absolute -left-8 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-lg font-semibold text-white shadow-lg">
                          {index + 1}
                        </span>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Milestone {index + 1}</p>
                        <p className="mt-3 text-base font-semibold text-slate-700">{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {member.gallery && member.gallery.length > 0 && (
            <section className="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-200/60">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                    Visual Journey
                  </span>
                  <h2 className="mt-4 text-3xl font-bold text-slate-900">Gallery</h2>
                  <p className="mt-2 text-sm text-slate-600">Snapshots from {firstName}'s impact in action.</p>
                </div>
                <button
                  onClick={() => openLightbox(0)}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-5 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-100"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  View Slideshow
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {member.gallery.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image}
                      alt={`${member.name} - Gallery ${index + 1}`}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 transition group-hover:bg-slate-900/40" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isOpen && member.gallery && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4">
                  <button
                    onClick={closeLightbox}
                    className="absolute top-6 right-6 text-white transition hover:text-slate-200"
                    aria-label="Close gallery"
                  >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <button
                    onClick={() => navigate('prev')}
                    className="absolute left-4 md:left-10 text-white transition hover:scale-105 hover:text-slate-200"
                    aria-label="Previous image"
                  >
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5l-7.5-7.5L15 4.5" />
                    </svg>
                  </button>

                  <div className="relative flex max-h-[90vh] w-full max-w-4xl items-center justify-center overflow-hidden">
                    <img
                      key={currentImageIndex}
                      src={member.gallery[currentImageIndex]}
                      alt={`${member.name} - Gallery ${currentImageIndex + 1}`}
                      className={`max-h-[90vh] w-full max-w-full rounded-3xl object-contain shadow-2xl transition-all duration-300 ease-in-out ${
                        isAnimating
                          ? direction === 'right'
                            ? 'translate-x-12 opacity-0'
                            : '-translate-x-12 opacity-0'
                          : 'translate-x-0 opacity-100'
                      }`}
                    />
                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur">
                      <span>{currentImageIndex + 1} / {member.gallery.length}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('next')}
                    className="absolute right-4 md:right-10 text-white transition hover:scale-105 hover:text-slate-200"
                    aria-label="Next image"
                  >
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5l7.5 7.5L9 19.5" />
                    </svg>
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
