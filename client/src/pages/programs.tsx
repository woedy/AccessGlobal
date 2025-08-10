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
        schools: "87 Schools Built",
        students: "25,000+ Students Supported", 
        teachers: "1,200+ Teachers Trained",
        countries: "15 Countries"
      },
      bgGradient: "from-blue-600 to-indigo-700",
      ctaText: "Support Education",
      featured: true
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
        trees: "500K+ Trees Planted",
        water: "200+ Clean Water Points",
        communities: "180 Communities Served",
        waste: "75% Waste Reduction Average"
      },
      bgGradient: "from-green-600 to-emerald-700",
      ctaText: "Join Green Movement"
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
        businesses: "3,500+ Businesses Launched",
        jobs: "12,000+ Jobs Created",
        women: "2,800+ Women Entrepreneurs",
        income: "40% Average Income Increase"
      },
      bgGradient: "from-purple-600 to-violet-700",
      ctaText: "Empower Entrepreneurs"
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
        patients: "85,000+ Patients Treated",
        clinics: "120 Mobile Clinics Operating",
        workers: "900+ Health Workers Trained",
        villages: "300+ Villages Reached"
      },
      bgGradient: "from-red-600 to-rose-700", 
      ctaText: "Support Healthcare"
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
        farmers: "15,000+ Farmers Trained",
        yield: "60% Average Yield Increase",
        cooperatives: "200+ Farmer Cooperatives",
        food: "2M+ People Fed Annually"
      },
      bgGradient: "from-amber-600 to-orange-700",
      ctaText: "Support Farmers"
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
        homes: "45,000+ Homes Powered",
        panels: "8,000+ Solar Installations",
        emissions: "30,000 Tons CO2 Reduced",
        technicians: "500+ Technicians Trained"
      },
      bgGradient: "from-yellow-600 to-amber-700",
      ctaText: "Power Communities"
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
        hectares: "25,000+ Hectares Monitored",
        efficiency: "45% Water Use Reduction", 
        technology: "300+ Smart Systems Deployed",
        farmers: "5,000+ Tech-Enabled Farmers"
      },
      bgGradient: "from-teal-600 to-cyan-700",
      ctaText: "Embrace Innovation"
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
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-900" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Our Programs
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Transforming lives through comprehensive global initiatives
              </p>
              <p className="text-3xl md:text-4xl font-bold text-yellow-400 italic">
                The World is Yours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Breaking Barriers, Building Futures
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Access Global Foundation, our programs are strategically designed to address interconnected challenges 
              facing underserved communities worldwide. From education to environmental sustainability, from economic 
              empowerment to healthcare access, we create comprehensive solutions that transform lives and communities.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">250+</div>
              <div className="text-gray-600 font-medium">Communities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">150K+</div>
              <div className="text-gray-600 font-medium">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Projects</div>
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
      <section className="py-20 bg-gray-50">
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

                  {/* Impact Metrics */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Target size={20} className="text-green-600" />
                      Our Impact
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(program.impact).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a href={program.link}>
                  <button
                    className={`w-full inline-flex items-center justify-center bg-gradient-to-r ${program.bgGradient} text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 group`}
                  >
                    {program.ctaText}
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
              Ready to Make a Global Impact?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in our mission to break down barriers and open doors to opportunity worldwide. 
              Together, we can make the world truly accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Get Involved Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-gray-900 transition-colors shadow-lg">
                Make a Donation
              </button>
              <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-gray-900 transition-colors shadow-lg">
                See Our Impact
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;