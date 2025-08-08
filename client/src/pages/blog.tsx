import NewsletterSignup from "@/components/newsletter-signup";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Clean Water Project Completed in Rural Kenya",
      excerpt: "Our latest water infrastructure project brings clean, accessible water to over 2,000 residents in the Turkana region...",
      date: "December 15, 2023",
      image: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Infrastructure"
    },
    {
      id: 2,
      title: "New School Opens in Sierra Leone",
      excerpt: "Celebrating the opening of our 87th school, providing education access to 400 children in the Bo District...",
      date: "December 10, 2023",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Education"
    },
    {
      id: 3,
      title: "Mobile Health Clinics Reach Remote Areas",
      excerpt: "Our new fleet of mobile health clinics extends medical care to previously unreachable communities...",
      date: "December 5, 2023",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Healthcare"
    },
    {
      id: 4,
      title: "Emergency Response Training in Bangladesh",
      excerpt: "Training local volunteers in disaster preparedness and emergency response protocols...",
      date: "November 28, 2023",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Security"
    },
    {
      id: 5,
      title: "Agricultural Training Program Shows Results",
      excerpt: "Farmers in Guatemala report 40% increase in crop yields after completing our sustainable farming program...",
      date: "November 20, 2023",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Community Development"
    },
    {
      id: 6,
      title: "Volunteer Spotlight: Meet Sarah's Team",
      excerpt: "Learn about our incredible volunteers who are making a difference in communities across Africa...",
      date: "November 15, 2023",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Volunteers"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about our ongoing projects, impact reports, and upcoming events
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2">
            <img 
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {blogPosts[0].category}
                </span>
                <span className="text-gray-500 text-sm ml-4">{blogPosts[0].date}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <button className="text-primary-500 hover:text-primary-600 font-medium">
                Read Full Story →
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm ml-auto">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-primary-500 hover:text-primary-600 font-medium">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Categories Filter */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["All", "Education", "Healthcare", "Infrastructure", "Security", "Community Development", "Volunteers"].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-gray-100 hover:bg-primary-500 hover:text-white rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get monthly updates on our projects, impact stories, and ways to get involved.
          </p>
          <NewsletterSignup />
        </div>

        {/* Recent Impact */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">This Month's Impact</h2>
            <p className="text-xl opacity-90">See what we've accomplished together</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2,450</div>
              <div className="opacity-90">People Reached</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="opacity-90">New Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="opacity-90">Volunteers Deployed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$45K</div>
              <div className="opacity-90">Funds Raised</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
