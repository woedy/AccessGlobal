import React from "react";
import { motion } from "framer-motion";
import { Zap, Sun, Wind, Battery, Users, Globe } from "lucide-react";

const EnergyProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <Zap size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Renewable Energy
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Powering progress with clean energy
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
                Bringing Clean Energy to Communities
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching clean energy solutions that bring reliable, sustainable power to communities while protecting the environment. Our mission is to bridge the energy gap and promote sustainable development.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through solar installations, wind projects, and energy storage systems, we'll provide communities with access to modern energy while reducing carbon emissions and environmental impact.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full">
                  <Sun size={20} />
                  <span className="font-semibold">Homes to Power: 2,000+</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <Globe size={20} />
                  <span className="font-semibold">Communities: 25+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-50 to-amber-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-600 text-white p-2 rounded-full">
                    <Sun size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Solar Installations</h4>
                    <p className="text-gray-600 text-sm">Rural community solar power</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-600 text-white p-2 rounded-full">
                    <Wind size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Wind Energy Projects</h4>
                    <p className="text-gray-600 text-sm">Sustainable wind power solutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-600 text-white p-2 rounded-full">
                    <Battery size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Energy Storage</h4>
                    <p className="text-gray-600 text-sm">Grid connectivity and storage systems</p>
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
              Our comprehensive renewable energy approach includes these key initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sun size={32} className="text-yellow-600" />,
                title: "Solar Panel Installation",
                description: "Large-scale solar installations in rural communities to provide reliable, clean electricity access."
              },
              {
                icon: <Wind size={32} className="text-yellow-600" />,
                title: "Wind Energy Projects",
                description: "Sustainable wind power solutions for communities with suitable wind resources and conditions."
              },
              {
                icon: <Battery size={32} className="text-yellow-600" />,
                title: "Energy Storage Systems",
                description: "Advanced battery storage and grid connectivity solutions for consistent power supply."
              },
              {
                icon: <Users size={32} className="text-yellow-600" />,
                title: "Technical Training",
                description: "Comprehensive training programs for local technicians to maintain renewable energy systems."
              },
              {
                icon: <Globe size={32} className="text-yellow-600" />,
                title: "Clean Cooking Solutions",
                description: "Efficient stoves and clean cooking technologies to reduce indoor air pollution and fuel costs."
              },
              {
                icon: <Zap size={32} className="text-yellow-600" />,
                title: "Grid Integration",
                description: "Smart grid technologies and connectivity solutions for efficient energy distribution and management."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-yellow-50 p-3 rounded-lg inline-block mb-4">
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
              Ambitious renewable energy targets to achieve over the next five years
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Homes to Power", color: "text-yellow-600" },
              { number: "300+", label: "Communities", color: "text-blue-600" },
              { number: "1,200", label: "Technicians", color: "text-green-600" },
              { number: "200,000", label: "Tons CO2 Reduced", color: "text-orange-600" }
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
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-amber-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Power Progress?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching these renewable energy initiatives. Your support will help us bring clean, sustainable power to communities that need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Support This Program
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-yellow-600 transition-colors">
                Learn About Other Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnergyProgram;
