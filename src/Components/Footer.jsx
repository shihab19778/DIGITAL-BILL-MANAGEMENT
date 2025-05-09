import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWallet } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
    <footer className="bg-gradient-to-br from-[#23272f] to-[#18181b] text-white rounded-t-3xl mt-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-gray-300 mb-6 text-sm">
              Subscribe to our newsletter to receive updates on new features, bill payment reminders, and exclusive offers.
            </p>
            <motion.form 
              onSubmit={handleSubscribe} 
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1 relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm group-hover:bg-white/10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaEnvelope className="text-gray-400 text-sm group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isSubscribing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform" />
                    <span>Subscribe</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mr-3">
                <FaWallet className="text-lg text-blue-400" />
              </div>
              <h3 className="text-base font-bold">Pay Bills</h3>
            </div>
            <p className="text-gray-400 mb-3 text-sm">
              Simplify your bill payments with our secure and convenient platform. Serving Bangladesh since 2024.
            </p>
            <div className="flex space-x-2">
              {[
                { icon: <FaFacebookF />, bg: 'bg-blue-600/20', hover: 'hover:bg-blue-500/30' },
                { icon: <FaTwitter />, bg: 'bg-blue-400/20', hover: 'hover:bg-blue-300/30' },
                { icon: <FaInstagram />, bg: 'bg-pink-600/20', hover: 'hover:bg-pink-500/30' },
                { icon: <FaLinkedinIn />, bg: 'bg-blue-700/20', hover: 'hover:bg-blue-600/30' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-7 h-7 rounded-lg ${social.bg} ${social.hover} flex items-center justify-center transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-base font-medium mb-3 border-b border-gray-700/50 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/bills', text: 'Pay Bills' },
                { to: '/profile', text: 'My Account' },
                { to: '/contact', text: 'Contact Us' },
                { to: '/security', text: 'Security' },
                { to: '/faq', text: 'FAQs' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={link.to} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Bill Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-base font-medium mb-3 border-b border-gray-700/50 pb-2">Bill Categories</h3>
            <ul className="space-y-2">
              {[
                { to: '/bills?type=electricity', text: 'Electricity' },
                { to: '/bills?type=water', text: 'Water' },
                { to: '/bills?type=gas', text: 'Gas' },
                { to: '/bills?type=internet', text: 'Internet' },
                { to: '/bills?type=mobile', text: 'Mobile' }
              ].map((category, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={category.to} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {category.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-base font-medium mb-3 border-b border-gray-700/50 pb-2">Contact Us</h3>
            <ul className="space-y-2">
              {[
                { icon: <FaMapMarkerAlt />, text: 'Dhaka, Bangladesh' },
                { icon: <FaPhone />, text: '+880 123 456 7890' },
                { icon: <FaEnvelope />, text: 'support@paybills.com.bd' }
              ].map((contact, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <span className="text-blue-400 inline mr-2 text-sm">{contact.icon}</span>
                  <span className="text-gray-400 text-sm">{contact.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-gray-700/50 pt-6 text-center text-gray-400"
        >
          <p className="text-sm">&copy; {currentYear} Pay Bills. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 