import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Heart,
  Users,
  Globe,
  Leaf,
  TrendingUp,
  Activity,
  Sprout,
  Zap,
  Cpu,
} from "lucide-react";

// Impact Counter Component with animation
const ImpactCounter = ({ target, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="text-center transform hover:scale-105 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        {count.toLocaleString()}+
      </div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
};

// Floating Elements Component
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
    <div
      className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60"
      style={{ animationDelay: "1s" }}
    ></div>
    <div
      className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-70"
      style={{ animationDelay: "2s" }}
    ></div>
    <div
      className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"
      style={{ animationDelay: "0.5s" }}
    ></div>
  </div>
);

// Program Card Component
const ProgramCard = ({ icon: Icon, title, description, color, image }) => (
  <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div
        className={`absolute top-4 left-4 p-3 rounded-full bg-${color}-500 text-white shadow-lg`}
      >
        <Icon size={24} />
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      <a href="/programs">
      <button className="text-blue-500 hover:text-blue-700 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
        Learn More
        <span className="ml-2 text-lg">→</span>
      </button>
      </a>
    </div>
  </div>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const programs = [
    {
      icon: Globe,
      title: "Global Education",
      description:
        "Scholarships, digital literacy, school infrastructure, and teacher training in underserved regions.",
      color: "blue",
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Leaf,
      title: "Environmental Empowerment",
      description:
        "Community-based sustainability projects: tree planting, clean water access, and waste management.",
      color: "green",
      image:
        "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
    },
    {
      icon: TrendingUp,
      title: "Economic Access",
      description:
        "Skills training, microfinance support, and mentorship for youth and women entrepreneurs.",
      color: "purple",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Activity,
      title: "Health & Wellness",
      description:
        "Mobile clinics, health awareness programs, and partnerships for medicine and medical aid delivery.",
      color: "red",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Sprout,
      title: "Training for Farmers",
      description:
        "Modern farming techniques, crop management, and sustainable agriculture practices to boost productivity.",
      color: "amber",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Zap,
      title: "Renewable Energy",
      description:
        "Solar power installations, wind energy projects, and clean energy access for remote communities.",
      color: "yellow",
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Cpu,
      title: "Agri-Tech Innovation",
      description:
        "Smart farming solutions, precision agriculture, and technology integration for modern farming practices.",
      color: "cyan",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-700/70 to-indigo-800/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/8542360/pexels-photo-8542360.jpeg')",
          }}
        ></div>

        {/* Floating elements */}
        <FloatingElements />

        <div
          className={`relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8">
            {/* Logo */}
                         <div className="mb-8">
                               <img 
                  src="/assets/access_logo.jpg" 
                  alt="Access Global Foundation Logo" 
                  className="h-72 w-auto mx-auto mb-6 rounded-full shadow-2xl"
                />
             </div>
          </div>

          

          <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-4xl mx-auto leading-relaxed">
            We're a new foundation with big dreams. Help us create a world where every individual, regardless of
            background or geography, has the opportunity to thrive and unlock
            their potential.
          </p>



          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/donate">
            <button className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-2xl flex items-center">
              <Heart className="mr-3 group-hover:animate-pulse" size={20} />
               Support Our Launch

              <div className="ml-2 bg-white/20 rounded-full px-3 py-1 text-sm">
                →
              </div>
            </button>
            </a>
                         <a href="/get-involved">
             <button className="group bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm flex items-center">
               <Users className="mr-3 group-hover:text-blue-600" size={20} />
               Join Our Mission
             </button>

             </a>
           </div>
           
           <div className="mt-8">
             <div className="inline-block px-6 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30 backdrop-blur-sm">
               <span className="text-yellow-400 font-semibold">
                 Live, Love, Life
               </span>
             </div>
           </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer">
          <div className="flex flex-col items-center">
            <ChevronDown size={32} className="mb-2" />
            <span className="text-sm opacity-75">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Impact Statistics with enhanced design */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our First Year Goals
            </h2>
            <p className="text-xl opacity-90">
              Help us achieve these ambitious targets in our launch year
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactCounter target={15} label="Countries to Reach" />
            <ImpactCounter target={100} label="Lives to Transform" />
            <ImpactCounter target={50} label="Partnerships to Build" />
            <ImpactCounter target={25} label="Projects to Launch" />
          </div>
        </div>
      </section>

      {/* Mission Statement with creative layout */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
           
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
              Our Mission
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                To create pathways to opportunities by breaking down barriers in
                underserved communities and promoting equitable access to tools
                that change lives. Access Global Foundation is committed to
                unlocking potential and opening doors socially, economically,
                and educationally across the globe.
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-500">
                <blockquote className="text-2xl font-medium text-gray-800 italic mb-4">
                  "The world is yours. Let's make it accessible."
                </blockquote>
                <cite className="text-blue-600 font-bold">
                  - Access Global Foundation
                </cite>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Community impact"
                  className="rounded-2xl w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 rounded-2xl p-6 shadow-xl">
                <div className="text-2xl font-bold text-gray-900">7+</div>
                <div className="text-sm text-gray-700">Programs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Programs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
          
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Programs We're Launching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Help us launch these comprehensive initiatives designed to address critical needs and
              create lasting impact across multiple sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProgramCard {...program} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <FloatingElements />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-block px-6 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30 backdrop-blur-sm mb-6">
              <span className="text-yellow-400 font-semibold">
                Join Our Movement
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Ready to Help Us Launch?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join our founding supporters who are helping us create positive change in
            communities worldwide. Together, we can build a more accessible and
            equitable future for all.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
          <a href="/donate">
            <button className="group bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-2xl flex items-center">
              <Heart
                className="mr-3 group-hover:text-red-500 group-hover:animate-pulse"
                size={20}
              />
              Support Our Launch
              <div className="ml-2 bg-blue-600 text-white rounded-full px-3 py-1 text-sm">
                →
              </div>
              
            </button>
            </a>
            <a href="/get-involved">
            <button className="group bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm flex items-center">
              <Users className="mr-3 group-hover:text-blue-600" size={20} />
              <a href="/get-involved"> Become a Founding Supporter </a>
            </button>
            </a>
          </div>

         

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">$1,000</div>
              <div className="opacity-90">
                Provides school supplies for one student for a month
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">$2,500</div>
              <div className="opacity-90">
                Funds health screenings for 10 community members
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">$5,000</div>
              <div className="opacity-90">
                Plants 50 trees for environmental restoration
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">$10,000</div>
              <div className="opacity-90">
                Supports microfinance for 5 entrepreneurs
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
