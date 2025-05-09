import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter to receive updates on new features, bill payment reminders, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubscribing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-3">
              <FaWallet className="text-xl text-blue-400 mr-2" />
              <h3 className="text-lg font-bold">Pay Bills</h3>
            </div>
            <p className="text-gray-400 mb-3">
              Simplify your bill payments with our secure and convenient platform.  Serving Bangladesh since 2024.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-300 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/bills" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Pay Bills
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-blue-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Bill Categories */}
          <div>
            <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Bill Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/bills/electricity" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Electricity
                </Link>
              </li>
              <li>
                <Link to="/bills/water" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Water
                </Link>
              </li>
              <li>
                <Link to="/bills/gas" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Gas
                </Link>
              </li>
              <li>
                 <Link to="/bills/internet" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Internet
                </Link>
              </li>
              <li>
                <Link to="/bills/mobile" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Mobile
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <FaMapMarkerAlt className="text-blue-400 inline mr-2" />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </li>
              <li>
                <FaPhone className="text-blue-400 inline mr-2" />
                <span className="text-gray-400">+880 123 456 7890</span>
              </li>
              <li>
                <FaEnvelope className="text-blue-400 inline mr-2" />
                <span className="text-gray-400">support@paybills.com.bd</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Pay Bills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
