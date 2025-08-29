import React from "react";
import { motion } from "framer-motion";
import { Tractor, Sprout, Leaf, Users, Globe, Target } from "lucide-react";

const AgricultureProgram = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm inline-block mb-6">
                <Tractor size={64} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Training for Farmers
              </h1>
              <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
                Growing food security, cultivating hope
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
                Modernizing Agriculture for Food Security
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're launching modern agricultural training programs that boost productivity, ensure food security, and create sustainable farming practices. Our mission is to empower farmers with the knowledge and tools they need to thrive.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through comprehensive training, modern equipment, and sustainable practices, we'll help farmers increase yields while protecting the environment and building resilient communities.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
                  <Users size={20} />
                  <span className="font-semibold">Farmers to Train: 1,000+</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                  <Target size={20} />
                  <span className="font-semibold">Communities: 30+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white p-2 rounded-full">
                    <Sprout size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Modern Techniques</h4>
                    <p className="text-gray-600 text-sm">Best practices and innovations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white p-2 rounded-full">
                    <Leaf size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sustainable Practices</h4>
                    <p className="text-gray-600 text-sm">Environmentally conscious farming</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white p-2 rounded-full">
                    <Tractor size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Equipment Access</h4>
                    <p className="text-gray-600 text-sm">Modern farming tools and machinery</p>
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
              Our comprehensive agricultural approach includes these key initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sprout size={32} className="text-amber-600" />,
                title: "Modern Farming Techniques",
                description: "Training in cutting-edge agricultural methods and best practices to maximize crop yields and efficiency."
              },
              {
                icon: <Leaf size={32} className="text-amber-600" />,
                title: "Sustainable Agriculture",
                description: "Promoting organic farming methods and environmentally conscious practices for long-term sustainability."
              },
              {
                icon: <Tractor size={32} className="text-amber-600" />,
                title: "Equipment Distribution",
                description: "Providing modern farming tools, machinery, and technology to enhance productivity and reduce manual labor."
              },
              {
                icon: <Users size={32} className="text-amber-600" />,
                title: "Farmer Cooperatives",
                description: "Building community-based farming networks for shared resources, knowledge, and market access."
              },
              {
                icon: <Globe size={32} className="text-amber-600" />,
                title: "Market Linkages",
                description: "Connecting farmers with markets and value chains to ensure fair prices and sustainable income."
              },
              {
                icon: <Target size={32} className="text-amber-600" />,
                title: "Crop Management",
                description: "Comprehensive training in pest control, soil health, and crop rotation for optimal farm productivity."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
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
              Help us achieve these ambitious agricultural targets in our launch year
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,000+", label: "Farmers to Train", color: "text-amber-600" },
              { number: "30+", label: "Communities", color: "text-green-600" },
              { number: "50", label: "Cooperatives", color: "text-blue-600" },
              { number: "60%", label: "Yield Increase Goal", color: "text-orange-600" }
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
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Cultivate Change?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in launching these agricultural initiatives. Your support will help us train farmers and build food-secure communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Support This Program
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-amber-600 transition-colors">
                Learn About Other Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AgricultureProgram;
