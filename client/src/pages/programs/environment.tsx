import React from "react";
import { motion } from "framer-motion";
import { Leaf, TreePine, Droplets, Recycle, Globe, Heart } from "lucide-react";

const EnvironmentProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <Leaf size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Environmental Empowerment
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Nurturing our planet, sustaining our future
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
                Building a Sustainable Future Together
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching community-driven environmental initiatives that promote sustainability, combat climate change, and ensure access to clean resources. Our approach focuses on empowering local communities to become stewards of their environment.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From large-scale reforestation projects to clean water access systems, we'll work alongside communities to implement solutions that protect our planet while improving lives.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                  <TreePine size={20} />
                  <span className="font-semibold">Trees to Plant: 100K+</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <Droplets size={20} />
                  <span className="font-semibold">Water Points: 50+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <TreePine size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Reforestation Projects</h4>
                    <p className="text-gray-600 text-sm">Large-scale tree planting initiatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Clean Water Access</h4>
                    <p className="text-gray-600 text-sm">Well construction and water systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <Recycle size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Waste Management</h4>
                    <p className="text-gray-600 text-sm">Recycling and waste reduction programs</p>
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
              Our comprehensive environmental approach includes these key initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TreePine size={32} className="text-green-600" />,
                title: "Reforestation Projects",
                description: "Large-scale tree planting and reforestation initiatives that restore ecosystems and combat climate change."
              },
              {
                icon: <Droplets size={32} className="text-green-600" />,
                title: "Clean Water Systems",
                description: "Construction of wells, water purification systems, and clean water access points for communities."
              },
              {
                icon: <Recycle size={32} className="text-green-600" />,
                title: "Waste Management",
                description: "Comprehensive recycling programs and waste reduction strategies to minimize environmental impact."
              },
              {
                icon: <Globe size={32} className="text-green-600" />,
                title: "Environmental Education",
                description: "Awareness campaigns and educational programs to promote environmental stewardship."
              },
              {
                icon: <Heart size={32} className="text-green-600" />,
                title: "Climate Adaptation",
                description: "Strategies and solutions to help vulnerable communities adapt to climate change impacts."
              },
              {
                icon: <Leaf size={32} className="text-green-600" />,
                title: "Community Partnerships",
                description: "Working with local communities to implement sustainable environmental solutions."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-green-50 p-3 rounded-lg inline-block mb-4">
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
              Ambitious environmental targets to achieve over the next five years
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1M+", label: "Trees to Plant", color: "text-green-600" },
              { number: "500+", label: "Clean Water Points", color: "text-blue-600" },
              { number: "300", label: "Communities to Serve", color: "text-purple-600" },
              { number: "80%", label: "Waste Reduction Goal", color: "text-orange-600" }
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Protect Our Planet?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching these environmental initiatives. Your support will help us create a more sustainable future for communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Support This Program
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-green-600 transition-colors">
                Learn About Other Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnvironmentProgram;
