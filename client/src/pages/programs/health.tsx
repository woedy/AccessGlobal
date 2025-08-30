import React from "react";
import { motion } from "framer-motion";
import { Heart, Stethoscope, Pill, Users, MapPin, Shield } from "lucide-react";

const HealthProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <Heart size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Health & Wellness Access
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Healing communities, saving lives
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
                Bringing Healthcare to Those Who Need It Most
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching holistic healthcare initiatives that bring essential medical services and health education to remote and underserved areas. Our mission is to ensure that quality healthcare is accessible to everyone, regardless of their location or economic status.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through mobile clinics, community health worker training, and preventive care programs, we'll work to bridge the healthcare gap and improve health outcomes in communities worldwide.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full">
                  <Users size={20} />
                  <span className="font-semibold">Patients to Reach: 5,000+</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <MapPin size={20} />
                  <span className="font-semibold">Communities: 30+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-red-50 to-rose-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <Stethoscope size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile Medical Clinics</h4>
                    <p className="text-gray-600 text-sm">Healthcare services in remote areas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <Pill size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Medicine Distribution</h4>
                    <p className="text-gray-600 text-sm">Essential medications and supplies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <Users size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Health Worker Training</h4>
                    <p className="text-gray-600 text-sm">Community healthcare professionals</p>
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
              Our comprehensive healthcare approach includes these key initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Stethoscope size={32} className="text-red-600" />,
                title: "Mobile Medical Clinics",
                description: "Portable healthcare units that bring medical services directly to remote and underserved communities."
              },
              {
                icon: <Shield size={32} className="text-red-600" />,
                title: "Preventive Care Programs",
                description: "Health awareness and prevention initiatives to reduce disease and promote wellness."
              },
              {
                icon: <Pill size={32} className="text-red-600" />,
                title: "Medicine Distribution",
                description: "Essential medications and medical supplies for communities in need."
              },
              {
                icon: <Users size={32} className="text-red-600" />,
                title: "Community Health Workers",
                description: "Training local community members to provide basic healthcare services."
              },
              {
                icon: <Heart size={32} className="text-red-600" />,
                title: "Maternal & Child Health",
                description: "Specialized care for mothers and children to ensure healthy development."
              },
              {
                icon: <MapPin size={32} className="text-red-600" />,
                title: "Remote Area Access",
                description: "Bringing healthcare services to communities that lack medical facilities."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-red-50 p-3 rounded-lg inline-block mb-4">
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
              Ambitious healthcare targets to achieve over the next five years
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100,000+", label: "Patients to Reach", color: "text-red-600" },
              { number: "60", label: "Mobile Clinics", color: "text-blue-600" },
              { number: "1,000", label: "Health Workers", color: "text-purple-600" },
              { number: "300+", label: "Communities", color: "text-orange-600" }
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
      <section className="py-16 bg-gradient-to-r from-red-600 to-rose-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching these healthcare initiatives. Your support will help us bring essential medical services to communities that need them most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Support This Program
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-red-600 transition-colors">
                Learn About Other Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HealthProgram;
