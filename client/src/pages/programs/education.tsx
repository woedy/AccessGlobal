import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ChevronRight, Users, Globe, BookOpen, Heart } from "lucide-react";

const EducationProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <GraduationCap size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Global Education Initiatives
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Unlocking minds, opening futures
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
                Breaking Down Barriers to Learning
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching comprehensive educational programs that break down barriers to learning and create pathways to knowledge for underserved communities worldwide. Our vision is to ensure that every child, regardless of their background or location, has access to quality education.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through strategic partnerships and community-driven approaches, we'll establish digital learning centers, provide scholarships, and build the infrastructure needed to transform education in communities that need it most.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <Users size={20} />
                  <span className="font-semibold">Students to Support: 1,000+</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                  <Globe size={20} />
                  <span className="font-semibold">Communities to Reach: 25+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Digital Literacy Centers</h4>
                    <p className="text-gray-600 text-sm">Modern technology access for remote communities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <Heart size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scholarship Programs</h4>
                    <p className="text-gray-600 text-sm">Supporting exceptional students in need</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <Users size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Teacher Training</h4>
                    <p className="text-gray-600 text-sm">Professional development for educators</p>
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
              Our comprehensive approach to educational transformation includes these key components
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen size={32} className="text-blue-600" />,
                title: "Scholarship Programs",
                description: "Financial support for exceptional students from underserved communities, ensuring they can pursue their educational dreams."
              },
              {
                icon: <Globe size={32} className="text-blue-600" />,
                title: "Digital Literacy Centers",
                description: "Modern technology hubs equipped with computers, internet access, and digital learning resources for communities."
              },
              {
                icon: <Users size={32} className="text-blue-600" />,
                title: "School Infrastructure",
                description: "Building and renovating schools to create safe, modern learning environments for students and teachers."
              },
              {
                icon: <Heart size={32} className="text-blue-600" />,
                title: "Teacher Development",
                description: "Comprehensive training programs to enhance teaching skills and introduce modern educational methodologies."
              },
              {
                icon: <BookOpen size={32} className="text-blue-600" />,
                title: "Resource Distribution",
                description: "Providing textbooks, learning materials, and library resources to schools and communities in need."
              },
              {
                icon: <Globe size={32} className="text-blue-600" />,
                title: "Community Engagement",
                description: "Working closely with local communities to ensure our programs meet their specific educational needs."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
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
              Our 5-Year Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ambitious education targets to achieve over the next five years
            </p>
          </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "300", label: "Schools to Support", color: "text-blue-600" },
              { number: "50,000+", label: "Students to Reach", color: "text-green-600" },
              { number: "1,500+", label: "Teachers to Train", color: "text-purple-600" },
              { number: "150", label: "Communities to Serve", color: "text-orange-600" }
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Support Education?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching this transformative educational program. Your support will help us break down barriers and create opportunities for students worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Support This Program
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                Learn About Other Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EducationProgram;
