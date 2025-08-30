import React from "react";
import { motion } from "framer-motion";
import { Cpu, ChevronRight, Users, Globe, Leaf, Heart, Zap } from "lucide-react";

const AgriTechProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <Cpu size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Agri-Tech Innovation
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Revolutionizing agriculture through technology
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
                Smart Farming for the Future
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching cutting-edge agri-tech programs that will revolutionize farming practices and boost agricultural productivity in underserved communities. Our vision is to bridge the technology gap and bring smart farming solutions to farmers who need them most.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through strategic partnerships with tech innovators and agricultural experts, we'll deploy precision agriculture tools, IoT sensors, and data-driven farming solutions that will transform traditional farming into a modern, efficient, and sustainable practice.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full">
                  <Users size={20} />
                  <span className="font-semibold">Farmers to Support: 500+</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                  <Globe size={20} />
                  <span className="font-semibold">Communities to Reach: 20+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-600 text-white p-2 rounded-full">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Precision Agriculture</h4>
                    <p className="text-gray-600 text-sm">GPS-guided farming and soil analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-600 text-white p-2 rounded-full">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">IoT Sensors</h4>
                    <p className="text-gray-600 text-sm">Real-time monitoring of crop conditions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-600 text-white p-2 rounded-full">
                    <Leaf size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Irrigation</h4>
                    <p className="text-gray-600 text-sm">Automated water management systems</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Launch Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're preparing to launch these transformative agri-tech programs that will modernize farming practices and increase agricultural yields.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-cyan-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Cpu size={32} className="text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Precision Farming Technology
              </h3>
              <p className="text-gray-600 mb-6">
                We'll deploy GPS-guided tractors, soil sensors, and drone technology to enable farmers to make data-driven decisions about planting, fertilizing, and harvesting.
              </p>
              <div className="flex items-center text-cyan-600 font-semibold">
                <span>Launch Target: Q2 2024</span>
                <ChevronRight size={20} className="ml-2" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Zap size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Irrigation Systems
              </h3>
              <p className="text-gray-600 mb-6">
                Automated irrigation systems with moisture sensors and weather integration will help farmers optimize water usage and improve crop yields.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Launch Target: Q3 2024</span>
                <ChevronRight size={20} className="ml-2" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Leaf size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Crop Management Apps
              </h3>
              <p className="text-gray-600 mb-6">
                Mobile applications will provide farmers with real-time insights about crop health, pest management, and optimal harvesting times.
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>Launch Target: Q4 2024</span>
                <ChevronRight size={20} className="ml-2" />
              </div>
            </motion.div>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our 5-Year Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With your support, we aim to achieve these ambitious targets over the next five years and lay the foundation for long-term agricultural transformation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-8 rounded-2xl mb-4">
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <div className="text-lg">Farmers to Support</div>
              </div>
              <p className="text-gray-600">We'll provide agri-tech solutions and training to farmers in underserved communities.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl mb-4">
                <div className="text-4xl font-bold mb-2">250+</div>
                <div className="text-lg">Communities to Reach</div>
              </div>
              <p className="text-gray-600">We'll establish agri-tech hubs in rural communities across multiple regions.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-8 rounded-2xl mb-4">
                <div className="text-4xl font-bold mb-2">40%</div>
                <div className="text-lg">Yield Increase Target</div>
              </div>
              <p className="text-gray-600">We aim to help farmers achieve significant improvements in crop productivity.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-8 rounded-2xl mb-4">
                <div className="text-4xl font-bold mb-2">100</div>
                <div className="text-lg">Tech Partners</div>
              </div>
              <p className="text-gray-600">We'll build partnerships with leading agri-tech companies and research institutions.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Help Us Launch Agri-Tech Innovation
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your support will help us bring cutting-edge agricultural technology to farmers who need it most. Together, we can revolutionize farming practices and create sustainable food systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/donate">
                <button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl flex items-center">
                  <Heart className="mr-3" size={20} />
                  Support Our Launch
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </a>
              <a href="/get-involved">
                <button className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-cyan-600 px-8 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm">
                  Join Our Mission
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AgriTechProgram;
