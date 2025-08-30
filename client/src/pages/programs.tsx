import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Leaf, 
  Briefcase, 
  Heart, 
  Tractor, 
  Zap, 
  Cpu,
  Globe,
  Users,
  ChevronRight,
  MapPin,
  Target
} from "lucide-react";

const Programs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const programs = [
    {
      id: "education",
      title: "Global Education Initiatives",
      icon: <GraduationCap size={48} className="text-blue-600" />,
      link: "/donate",
      category: "education",
      tagline: "Unlocking minds, opening futures",
      description: "Comprehensive educational programs that break down barriers to learning and create pathways to knowledge for underserved communities worldwide.",
      features: [
        "Scholarship programs for exceptional students in need",
        "Digital literacy centers with modern technology",
        "School infrastructure development and renovation",
        "Teacher training and professional development",
        "Educational resource distribution and library establishment"
      ],
      impact: {
        schools: "25 Schools to Build",
        students: "1,000+ Students to Support", 
        teachers: "100+ Teachers to Train",
        countries: "15 Countries to Reach"
      },
      bgGradient: "from-blue-600 to-indigo-700",
      ctaText: "Support Education",
      featured: true,
      launchPhase: "Phase 1 - Launch Ready"
    },
    {
      id: "environment",
      title: "Environmental Empowerment",
      icon: <Leaf size={48} className="text-green-600" />,
      link: "/donate",
      category: "environment", 
      tagline: "Nurturing our planet, sustaining our future",
      description: "Community-driven environmental initiatives that promote sustainability, combat climate change, and ensure access to clean resources.",
      features: [
        "Large-scale tree planting and reforestation projects",
        "Clean water access systems and well construction",
        "Waste management and recycling programs",
        "Environmental education and awareness campaigns",
        "Climate adaptation strategies for vulnerable communities"
      ],
      impact: {
        trees: "50K+ Trees to Plant",
        water: "20+ Clean Water Points to Build",
        communities: "20 Communities to Serve",
        waste: "25% Waste Reduction Target"
      },
      bgGradient: "from-green-600 to-emerald-700",
      ctaText: "Join Green Movement",
      launchPhase: "Phase 1 - Launch Ready"
    },
    {
      id: "economic",
      title: "Economic Access & Entrepreneurship",
      icon: <Briefcase size={48} className="text-purple-600" />,
      link: "/donate",
      category: "economic",
      tagline: "Empowering dreams, building prosperity", 
      description: "Comprehensive economic empowerment programs that provide skills, resources, and opportunities for sustainable livelihoods.",
      features: [
        "Skills training in high-demand industries",
        "Microfinance and small business loan programs",
        "Mentorship networks connecting local and global experts",
        "Women's economic empowerment initiatives",
        "Youth entrepreneurship incubators"
      ],
      impact: {
        businesses: "100+ Businesses to Launch",
        jobs: "500+ Jobs to Create",
        women: "200+ Women Entrepreneurs to Support",
        income: "25% Average Income Increase Target"
      },
      bgGradient: "from-purple-600 to-violet-700",
      ctaText: "Empower Entrepreneurs",
      launchPhase: "Phase 1 - Launch Ready"
    },
    {
      id: "health",
      title: "Health & Wellness Access",
      icon: <Heart size={48} className="text-red-600" />,
      link: "/donate",
      category: "health",
      tagline: "Healing communities, saving lives",
      description: "Holistic healthcare initiatives that bring essential medical services and health education to remote and underserved areas.",
      features: [
        "Mobile medical clinics serving remote areas",
        "Health awareness and prevention programs", 
        "Medicine and medical supply distribution",
        "Community health worker training",
        "Maternal and child health initiatives"
      ],
      impact: {
        patients: "1,000+ Patients to Treat",
        clinics: "5 Mobile Clinics to Launch",
        workers: "50+ Health Workers to Train",
        villages: "15 Villages to Reach"
      },
      bgGradient: "from-red-600 to-rose-700", 
      ctaText: "Support Healthcare",
      launchPhase: "Phase 1 - Launch Ready"
    },
    {
      id: "agriculture",
      title: "Training for Farmers",
      icon: <Tractor size={48} className="text-amber-600" />,
      link: "/donate",
      category: "agriculture",
      tagline: "Growing food security, cultivating hope",
      description: "Modern agricultural training programs that boost productivity, ensure food security, and create sustainable farming practices.",
      features: [
        "Modern farming techniques and best practices",
        "Crop management and pest control training",
        "Sustainable agriculture and organic farming methods",
        "Agricultural equipment and tool distribution",
        "Market linkage and value chain development"
      ],
      impact: {
        farmers: "500+ Farmers to Train",
        yield: "30% Average Yield Increase Target",
        cooperatives: "20+ Farmer Cooperatives to Form",
        food: "100K+ People to Feed Annually"
      },
      bgGradient: "from-amber-600 to-orange-700",
      ctaText: "Support Farmers",
      launchPhase: "Phase 1 - Launch Ready"
    },
    {
      id: "energy",
      title: "Renewable Energy",
      icon: <Zap size={48} className="text-yellow-600" />,
      link: "/donate",
      category: "environment",
      tagline: "Powering progress with clean energy",
      description: "Clean energy solutions that bring reliable, sustainable power to communities while protecting the environment.",
      features: [
        "Solar panel installation in rural communities",
        "Wind energy projects for sustainable power",
        "Clean cooking solutions and efficient stoves",
        "Energy storage and grid connectivity systems",
        "Technical training for renewable energy maintenance"
      ],
      impact: {
        homes: "500+ Homes to Power",
        panels: "200+ Solar Installations to Deploy",
        emissions: "5,000 Tons CO2 Reduction Target",
        technicians: "50+ Technicians to Train"
      },
      bgGradient: "from-yellow-600 to-amber-700",
      ctaText: "Power Communities",
      launchPhase: "Phase 1 - Launch Ready"
    },
    {
      id: "agritech",
      title: "Agri-Tech Innovation",
      icon: <Cpu size={48} className="text-teal-600" />,
      link: "/donate",
      category: "technology",
      tagline: "Technology meets tradition for better harvests",
      description: "Cutting-edge agricultural technology solutions that revolutionize farming practices and maximize crop yields.",
      features: [
        "Precision agriculture and GPS-guided farming",
        "Smart irrigation and water management systems",
        "Drone technology for crop monitoring and analysis",
        "Mobile apps for weather and market information",
        "IoT sensors for soil and crop health monitoring"
      ],
      impact: {
        hectares: "5,000+ Hectares to Monitor",
        efficiency: "25% Water Use Reduction Target", 
        technology: "50+ Smart Systems to Deploy",
        farmers: "500+ Farmers to Enable"
      },
      bgGradient: "from-teal-600 to-cyan-700",
      ctaText: "Embrace Innovation",
      featured: false,
      launchPhase: "Phase 1 - Launch Ready"
    }
  ];

  const categories = [
    { id: "all", name: "All Programs", icon: <Globe size={20} /> },
    { id: "education", name: "Education", icon: <GraduationCap size={20} /> },
    { id: "environment", name: "Environment", icon: <Leaf size={20} /> },
    { id: "economic", name: "Economic", icon: <Briefcase size={20} /> },
    { id: "health", name: "Health", icon: <Heart size={20} /> },
    { id: "agriculture", name: "Agriculture", icon: <Tractor size={20} /> },
    { id: "technology", name: "Technology", icon: <Cpu size={20} /> }
  ];

  const filteredPrograms = activeTab === "all" 
    ? programs 
    : programs.filter(program => program.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-900" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <div className="mb-4">
                <img 
                  src="/assets/access_logo.jpg" 
                  alt="Access Global Foundation Logo" 
                  className="h-48 w-auto mx-auto mb-4 rounded-full shadow-2xl"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Programs We are Launching
              </h1>
              <p className="text-lg md:text-xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Help us launch these comprehensive global initiatives to transform lives
              </p>
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Breaking Barriers, Building Futures
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Access Global Foundation, we are designing programs to address interconnected challenges 
              facing underserved communities worldwide. From education to environmental sustainability, from economic 
              empowerment to healthcare access, we'll create comprehensive solutions that transform lives and communities.
            </p>
          </div>

          {/* Five-Year Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">100</div>
              <div className="text-gray-600 font-medium">Countries to Reach</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">500</div>
              <div className="text-gray-600 font-medium">Communities to Serve</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50,000</div>
              <div className="text-gray-600 font-medium">Lives to Transform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">250</div>
              <div className="text-gray-600 font-medium">Projects to Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories Filter */}
      <section className="py-8 bg-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                id={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Program Header */}
                <div className={`bg-gradient-to-r ${program.bgGradient} p-8 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      {program.icon}
                    </div>
                    {program.featured && (
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{program.title}</h3>
                  <p className="text-lg italic opacity-90">{program.tagline}</p>
                </div>

                {/* Program Content */}
                <div className="p-8">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {program.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">Key Features:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ChevronRight size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>



                  {/* CTA Button */}
                  <a href={`/programs/${program.id}`}>
                  <button
                    className={`w-full inline-flex items-center justify-center bg-gradient-to-r ${program.bgGradient} text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 group`}
                  >
                    Learn More
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Help Us Launch?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching our mission to break down barriers and open doors to opportunity worldwide. 
              Together, we can make the world truly accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/get-involved">
                <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                  Join Our Mission
                </button>
              </a>
              <a href="/donate">
                <button className="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-600 transition-colors shadow-lg">
                  Donate Now
                </button>
              </a>
              <a href="/get-involved">
                <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-gray-900 transition-colors shadow-lg">
                  Be a Founding Supporter
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
