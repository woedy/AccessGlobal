import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/assets/access_logo.jpg" 
              alt="Access Global Foundation Logo" 
              className="h-16 w-auto mx-auto mb-6 rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to make a difference? We'd love to hear from you and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Volunteer Opportunities</option>
                  <option>Partnership</option>
                  <option>Media & Press</option>
                  <option>Donation Questions</option>
                  <option>Program Information</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us how we can help or how you'd like to get involved..."
                ></textarea>
              </div>

              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4">
                <i className="fas fa-paper-plane mr-2"></i> Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-primary-500 text-xl w-6 mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-600">
                    1629 k street NW #300<br />
                    Washington DC, 20006<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-envelope text-primary-500 text-xl w-6 mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      General: info@accessglobal.org<br />
                      Partnerships: partners@accessglobal.org<br />
                      Volunteer: volunteer@accessglobal.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="fas fa-phone text-primary-500 text-xl w-6 mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      Main: +1 (555) 123-4567<br />
                      Volunteer Line: +1 (555) 123-4568
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="fas fa-clock text-primary-500 text-xl w-6 mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 4:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Regional Offices</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Africa</h3>
                  <p className="text-gray-600">Nairobi, Kenya | Lagos, Nigeria</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Asia</h3>
                  <p className="text-gray-600">Manila, Philippines | Dhaka, Bangladesh</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Latin America</h3>
                  <p className="text-gray-600">Guatemala City, Guatemala | Lima, Peru</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Our Work</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <i className="fab fa-facebook text-blue-600 text-2xl mr-3"></i>
                  <div>
                    <div className="font-semibold text-gray-900">Facebook</div>
                    <div className="text-sm text-gray-600">Daily updates</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <i className="fab fa-twitter text-blue-400 text-2xl mr-3"></i>
                  <div>
                    <div className="font-semibold text-gray-900">Twitter</div>
                    <div className="text-sm text-gray-600">News & insights</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center p-4 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                  <i className="fab fa-instagram text-pink-600 text-2xl mr-3"></i>
                  <div>
                    <div className="font-semibold text-gray-900">Instagram</div>
                    <div className="text-sm text-gray-600">Stories & photos</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <i className="fab fa-linkedin text-blue-700 text-2xl mr-3"></i>
                  <div>
                    <div className="font-semibold text-gray-900">LinkedIn</div>
                    <div className="text-sm text-gray-600">Professional</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How can I volunteer?</h3>
              <p className="text-gray-600 mb-4">
                We offer both local and international volunteer opportunities. Visit our Get Involved page or contact our volunteer coordinator directly.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Are donations tax-deductible?</h3>
              <p className="text-gray-600 mb-4">
                Yes, Access Global Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the full extent allowed by law.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do you use donations?</h3>
              <p className="text-gray-600 mb-4">
                98% of all donations go directly to our programs. We maintain complete transparency with annual impact reports available on our website.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Can companies partner with you?</h3>
              <p className="text-gray-600 mb-4">
                Absolutely! We offer various corporate partnership opportunities. Contact our partnerships team to explore options that align with your company's values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}