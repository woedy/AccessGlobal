import React from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Users, Heart, Globe, Target } from "lucide-react";

const EconomicProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <Briefcase size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Economic Access & Entrepreneurship
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Empowering dreams, building prosperity
              </p>
              <div className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                Phase 1 - Launch Ready
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Building Economic Foundations for Communities
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching comprehensive economic empowerment programs that provide skills, resources, and opportunities for sustainable livelihoods. Our vision is to create pathways to economic independence for individuals and communities.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through skills training, microfinance support, and mentorship networks, we'll connect local entrepreneurs with global opportunities and create sustainable economic growth.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
                  <Users size={20} />
                  <span className="font-semibold">Entrepreneurs to Support: 500+</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <Target size={20} />
                  <span className="font-semibold">Communities: 20+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white p-2 rounded-full">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Skills Training</h4>
                    <p className="text-gray-600 text-sm">High-demand industry skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white p-2 rounded-full">
                    <Heart size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Microfinance Support</h4>
                    <p className="text-gray-600 text-sm">Small business loan programs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white p-2 rounded-full">
                    <Users size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mentorship Networks</h4>
                    <p className="text-gray-600 text-sm">Local and global expert connections</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What We're Building
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive economic empowerment approach includes these key initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp size={32} className="text-purple-600" />,
                title: "Skills Training Programs",
                description: "Comprehensive training in high-demand industries to prepare individuals for meaningful employment and entrepreneurship."
              },
              {
                icon: <Briefcase size={32} className="text-purple-600" />,
                title: "Microfinance Support",
                description: "Small business loan programs and financial services to help entrepreneurs start and grow their businesses."
              },
              {
                icon: <Users size={32} className="text-purple-600" />,
                title: "Mentorship Networks",
                description: "Connecting local entrepreneurs with global experts for guidance, support, and knowledge sharing."
              },
              {
                icon: <Heart size={32} className="text-purple-600" />,
                title: "Women's Empowerment",
                description: "Specialized programs to support women entrepreneurs and promote gender equality in business."
              },
              {
                icon: <Target size={32} className="text-purple-600" />,
                title: "Youth Incubators",
                description: "Entrepreneurship incubators and accelerators for young people to develop business ideas."
              },
              {
                icon: <Globe size={32} className="text-purple-600" />,
                title: "Market Access",
                description: "Creating pathways for local products to reach global markets and expand business opportunities."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-purple-50 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Goals */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our First Year Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us achieve these ambitious economic empowerment targets in our launch year
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Entrepreneurs to Support", color: "text-purple-600" },
              { number: "20+", label: "Communities to Reach", color: "text-blue-600" },
              { number: "100", label: "Businesses to Launch", color: "text-green-600" },
              { number: "50", label: "Mentors to Connect", color: "text-orange-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-violet-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build Economic Futures?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching these economic empowerment initiatives. Your support will help us create opportunities for entrepreneurs and build sustainable communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Support This Program
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-purple-600 transition-colors">
                Learn About Other Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EconomicProgram;
