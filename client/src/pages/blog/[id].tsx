import { useRoute } from 'wouter';
import { useState, useEffect } from 'react';
import NewsletterSignup from "@/components/newsletter-signup";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  tags: string[];
}

export default function BlogPost() {
  const [, params] = useRoute('/blog/:id');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock blog data - in real app, this would come from your backend
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Clean Water Project Completed in Rural Kenya",
      excerpt: "Our latest water infrastructure project brings clean, accessible water to over 2,000 residents in the Turkana region...",
      content: `
        <p class="mb-6">In the arid landscapes of Kenya's Turkana region, access to clean water has long been a daily struggle for thousands of families. This December, we're proud to announce the successful completion of our most ambitious water infrastructure project to date, bringing sustainable access to clean water for over 2,000 residents.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Challenge</h2>
        <p class="mb-6">The Turkana region, located in northwestern Kenya, faces severe water scarcity due to its arid climate and limited infrastructure. Women and children often walk up to 10 kilometers daily to fetch water from contaminated sources, leading to waterborne diseases and preventing children from attending school regularly.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Solution</h2>
        <p class="mb-6">Working in partnership with local communities and government authorities, we implemented a comprehensive water infrastructure system that includes:</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>Deep borehole drilling with solar-powered pumps</li>
          <li>Water storage tanks with a capacity of 50,000 liters</li>
          <li>Distribution network serving 5 villages</li>
          <li>Water treatment and purification systems</li>
          <li>Community training on water management and maintenance</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Impact</h2>
        <p class="mb-6">The completion of this project has already shown remarkable results:</p>
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-bold text-blue-900 mb-2">Health Improvements</h3>
            <p class="text-blue-700">Waterborne diseases reduced by 85% in the first three months</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-bold text-green-900 mb-2">Education Access</h3>
            <p class="text-green-700">School attendance increased by 40% as children no longer need to fetch water</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-bold text-purple-900 mb-2">Economic Benefits</h3>
            <p class="text-purple-700">Women can now engage in income-generating activities instead of water collection</p>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h3 class="font-bold text-orange-900 mb-2">Community Empowerment</h3>
            <p class="text-orange-700">Local committees trained to maintain and manage the water system</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Community Voices</h2>
        <blockquote class="border-l-4 border-blue-500 pl-6 mb-6 italic text-gray-700">
          "For the first time in my life, I can turn on a tap and get clean water. My children are healthier, and I have time to work in my garden. This project has changed everything for our community." - Sarah Njoroge, Community Leader
        </blockquote>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Looking Forward</h2>
        <p class="mb-6">This project serves as a model for similar initiatives across East Africa. We're already planning to replicate this success in neighboring regions, with the goal of providing clean water access to 10,000 more people by the end of 2024.</p>
        
        <p class="mb-6">None of this would have been possible without the generous support of our donors and the tireless work of our local partners. Together, we're building a future where clean water is accessible to all.</p>
      `,
      date: "December 15, 2023",
      image: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Infrastructure",
      author: "Dr. Michael Chen",
      readTime: "8 min read",
      tags: ["Water", "Kenya", "Infrastructure", "Community Development"]
    },
    {
      id: 2,
      title: "New School Opens in Sierra Leone",
      excerpt: "Celebrating the opening of our 87th school, providing education access to 400 children in the Bo District...",
      content: `
        <p class="mb-6">Education is the foundation of sustainable development, and we're thrilled to announce the opening of our 87th school in Sierra Leone's Bo District. This state-of-the-art facility will provide quality education to 400 children who previously had limited access to schooling.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Need</h2>
        <p class="mb-6">The Bo District, while being Sierra Leone's second-largest city, still faces significant educational challenges. Many children, especially in rural areas, must travel long distances to reach the nearest school, often leading to high dropout rates and limited educational opportunities.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Building for the Future</h2>
        <p class="mb-6">Our new school facility includes:</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>12 modern classrooms with proper ventilation and lighting</li>
          <li>Computer lab with 20 workstations</li>
          <li>Science laboratory for practical learning</li>
          <li>Library with over 2,000 books</li>
          <li>Sports facilities including a football field</li>
          <li>Clean water and sanitation facilities</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Educational Programs</h2>
        <p class="mb-6">The school offers a comprehensive curriculum that includes:</p>
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-bold text-blue-900 mb-2">Core Subjects</h3>
            <p class="text-blue-700">Mathematics, Science, English, Social Studies, and local languages</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-bold text-green-900 mb-2">Life Skills</h3>
            <p class="text-green-700">Health education, environmental awareness, and digital literacy</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-bold text-purple-900 mb-2">Vocational Training</h3>
            <p class="text-purple-700">Agriculture, carpentry, and computer skills for older students</p>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h3 class="font-bold text-orange-900 mb-2">Extracurricular</h3>
            <p class="text-orange-700">Sports, music, art, and community service programs</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Community Involvement</h2>
        <p class="mb-6">The school was built with extensive community input and participation. Local craftsmen were employed during construction, and parents were involved in the planning process. This ensures the school truly serves the community's needs and creates local ownership.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Student Stories</h2>
        <blockquote class="border-l-4 border-green-500 pl-6 mb-6 italic text-gray-700">
          "I used to walk two hours each way to get to school. Now I can focus on my studies and have time to help my family. I want to become a teacher and help other children like me." - Aminata Kamara, Grade 6 Student
        </blockquote>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Future Plans</h2>
        <p class="mb-6">This school is part of our broader education initiative in Sierra Leone. We plan to build 10 more schools across the country by 2025, with a focus on underserved rural areas. Each school will be equipped with modern facilities and staffed by qualified teachers.</p>
      `,
      date: "December 10, 2023",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Education",
      author: "Sarah Johnson",
      readTime: "6 min read",
      tags: ["Education", "Sierra Leone", "Schools", "Children"]
    },
    {
      id: 3,
      title: "Mobile Health Clinics Reach Remote Areas",
      excerpt: "Our new fleet of mobile health clinics extends medical care to previously unreachable communities...",
      content: `
        <p class="mb-6">Access to healthcare remains one of the biggest challenges in rural communities across Africa. Our new fleet of mobile health clinics is changing this reality, bringing essential medical services directly to communities that have been historically underserved.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Mobile Clinic Initiative</h2>
        <p class="mb-6">We've deployed 15 fully-equipped mobile health clinics across five countries, each staffed by qualified medical professionals and equipped with essential diagnostic tools and medications. These clinics travel to remote villages on a regular schedule, ensuring consistent access to healthcare.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Services Provided</h2>
        <p class="mb-6">Each mobile clinic offers comprehensive healthcare services:</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>Primary healthcare consultations</li>
          <li>Maternal and child health services</li>
          <li>Vaccination programs</li>
          <li>Basic laboratory testing</li>
          <li>Health education and prevention programs</li>
          <li>Emergency care and referrals</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Technology Integration</h2>
        <p class="mb-6">Our mobile clinics are equipped with cutting-edge technology:</p>
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-bold text-blue-900 mb-2">Telemedicine</h3>
            <p class="text-blue-700">Connect with specialists in urban centers for complex cases</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-bold text-green-900 mb-2">Digital Records</h3>
            <p class="text-green-700">Electronic health records for better patient care</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-bold text-purple-900 mb-2">Solar Power</h3>
            <p class="text-purple-700">Sustainable energy for all medical equipment</p>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h3 class="font-bold text-orange-900 mb-2">GPS Tracking</h3>
            <p class="text-orange-700">Real-time location tracking for emergency response</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Impact Numbers</h2>
        <p class="mb-6">In the first six months of operation, our mobile clinics have achieved remarkable results:</p>
        <div class="grid md:grid-cols-4 gap-4 mb-6">
          <div class="text-center bg-blue-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-blue-900">15,000+</div>
            <div class="text-blue-700 text-sm">Patients Served</div>
          </div>
          <div class="text-center bg-green-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-green-900">45</div>
            <div class="text-green-700 text-sm">Villages Reached</div>
          </div>
          <div class="text-center bg-purple-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-purple-900">2,500</div>
            <div class="text-purple-700 text-sm">Vaccinations Given</div>
          </div>
          <div class="text-center bg-orange-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-orange-900">95%</div>
            <div class="text-orange-700 text-sm">Patient Satisfaction</div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Community Response</h2>
        <blockquote class="border-l-4 border-blue-500 pl-6 mb-6 italic text-gray-700">
          "The mobile clinic has been a lifeline for our village. Before, we had to travel for days to reach a hospital. Now, quality healthcare comes to us. My daughter received treatment for malaria that saved her life." - Chief Mwangi, Village Elder
        </blockquote>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Future Expansion</h2>
        <p class="mb-6">Based on the success of this initiative, we're planning to expand our mobile clinic program to reach 50 more communities by the end of 2024. We're also developing specialized clinics for maternal health and emergency response.</p>
      `,
      date: "December 5, 2023",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Healthcare",
      author: "Dr. Emily Rodriguez",
      readTime: "7 min read",
      tags: ["Healthcare", "Mobile Clinics", "Rural Health", "Technology"]
    }
  ];

  useEffect(() => {
    if (params?.id) {
      const foundPost = blogPosts.find(post => post.id === parseInt(params.id));
      setPost(foundPost || null);
      setLoading(false);
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.location.href = '/blog'}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => window.location.href = '/blog'}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm ml-4">{post.date}</span>
              <span className="text-gray-500 text-sm ml-4">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <p className="font-medium text-gray-900">By {post.author}</p>
                <p className="text-sm text-gray-500">Access Global Foundation</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Share This Article</h3>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Get notified when we publish new stories about our impact around the world.
          </p>
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
} 