import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import heroImage1 from '../assets/Home-3.png';
import heroImage2 from '../assets/Home (2).png';
import heroImage3 from '../assets/hero-3.png';
import { FaBolt, FaWater, FaMobileAlt, FaShieldAlt, FaUserClock, FaMoneyBillWave } from 'react-icons/fa';
import { BsLightbulb, BsBank, BsGraphUp, BsCreditCard2Front, BsCalendarCheck } from 'react-icons/bs';
import { AuthContext } from '../Provider/AuthProvider';

const Home = () => {
  const { user } = useContext(AuthContext);

  // Data for organizations
  const organizations = [
    { id: 1, name: 'DESCO', icon: <FaBolt className="text-3xl text-yellow-400" />, type: 'electricity' },
    { id: 2, name: 'WASA', icon: <FaWater className="text-3xl text-blue-400" />, type: 'water' },
    { id: 3, name: 'Titas Gas', icon: <BsLightbulb className="text-3xl text-orange-400" />, type: 'gas' },
    { id: 4, name: 'Grameenphone', icon: <FaMobileAlt className="text-3xl text-green-400" />, type: 'internet' },
    { id: 5, name: 'NESCO', icon: <FaBolt className="text-3xl text-purple-400" />, type: 'electricity' },
    { id: 6, name: 'BTCL', icon: <FaMobileAlt className="text-3xl text-red-400" />, type: 'internet' },
    { id: 7, name: 'BRAC Bank', icon: <BsCreditCard2Front className="text-3xl text-indigo-400" />, type: 'credit' },
    { id: 8, name: 'XYZ University', icon: <FaMoneyBillWave className="text-3xl text-pink-400" />, type: 'tuition' },
  ];

  // Data for hero slides
  const heroSlides = [
    {
      title: "Easy and Secure Bill Payments",
      subtitle: "Enjoy a seamless and secure bill payment experience.",
      buttonText: "Pay Now",
      image: heroImage1,
    },
    {
      title: "Save Time, Pay Bills Online",
      subtitle: "Skip the lines and pay your bills in minutes.",
      buttonText: "Explore",
      image: heroImage2,
    },
    {
      title: "Secure and Fast Payments",
      subtitle: "Your transactions are protected with the latest security measures.",
      buttonText: "Get Started",
      image: heroImage3,
    }
  ];

  // User testimonials
  const testimonials = [
    {
      id: 1,
      name: "Jisan Ahmed",
      title: "Regular Customer",
      quote: "This bill payment system has saved me so much time! I used to spend hours standing in line at different offices.",
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: 2,
      name: "Farida Khan",
      title: "Small Business Owner",
      quote: "Managing multiple utility bills for my business was a hassle until I found this platform. Now everything is centralized!",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      id: 3,
      name: "Kamal Hossain",
      title: "IT Professional",
      quote: "The interface is intuitive and the payment process is secure. I recommend this to everyone who values their time.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-gray-900 text-white">
      {/* Hero Slider */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-10">
        <div className="container mx-auto px-4">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {heroSlides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col md:flex-row items-center pl-4 md:pl-28">
                  <div className="w-full md:w-1/2 space-y-4 p-4 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-400" style={{
                      fontWeight: '800', // Ultra Black
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF', // White
                      WebkitTextStroke: '2px #4AB0FF', // Blue stroke
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Subtle shadow
                    }}>{slide.title}</h1>
                    <p className="text-lg text-gray-300">{slide.subtitle}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Link to="/bills" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 px-6 rounded-md">
                        {slide.buttonText}
                      </Link>
                      {!user && (
                        <Link to="/auth/register" className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 py-2 px-6 rounded-md">
                          Create Account
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={slide.image}
                      alt="Hero"
                      className="max-w-md w-full rounded-lg shadow-lg"
                     />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Organizations */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-400"  style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #86EF7D',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>Pay Bills From Top Organizations</h2>
            <p className="text-gray-400 mt-2">Manage all your utility bills in one place</p>
          </div>

          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {organizations.map(org => (
              <SwiperSlide key={org.id}>
                <Link to={`/bills?type=${org.type}`} className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-600">
                  <div className="mb-4">{org.icon}</div>
                  <h3 className="text-lg font-medium text-white">{org.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{org.type}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-400" style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #D8B4FE',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>How It Works</h2>
            <p className="text-gray-400 mt-2">Pay your bills in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-md transition-shadow duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <BsBank className="text-2xl text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Create an Account</h3>
              <p className="text-gray-400">Sign up for free and add your payment methods securely.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-md transition-shadow duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <FaUserClock className="text-2xl text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Select Your Bills</h3>
              <p className="text-gray-400">Choose from our wide range of supported bill providers.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-md transition-shadow duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <BsGraphUp className="text-2xl text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Complete Payment</h3>
              <p className="text-gray-400">Pay securely and receive instant confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-400" style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #A7F3D0',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>Why Choose Us</h2>
            <p className="text-gray-400 mt-2">Experience the best bill payment service in Bangladesh</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
              <div className="text-blue-400 mb-4">
                <FaShieldAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Secure Payments</h3>
              <p className="text-gray-400">Your transactions are protected with bank-level security measures.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
              <div className="text-green-400 mb-4">
                <FaMobileAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Mobile Friendly</h3>
              <p className="text-gray-400">Pay your bills anytime, anywhere from your mobile device.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
              <div className="text-yellow-400 mb-4">
                <BsLightbulb className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Reminders</h3>
              <p className="text-gray-400">Never miss a payment with our bill due date reminders.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
              <div className="text-purple-400 mb-4">
                <BsGraphUp className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Payment History</h3>
              <p className="text-gray-400">Track all your payments in one place for better financial management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-pink-400" style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #F472B6',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>What Our Users Say</h2>
            <p className="text-gray-400 mt-2">Trusted by thousands of customers across Bangladesh</p>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {testimonials.map(testimonial => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-gray-800 rounded-xl shadow-md p-8 max-w-3xl mx-auto hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="mb-6 sm:mb-0 sm:mr-8">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 rounded-full border-4 border-purple-500 object-cover"
                      />
                    </div>
                    <div>
                      <blockquote className="text-lg italic text-gray-300 mb-4">"{testimonial.quote}"</blockquote>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Mobile Banking Integration */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <img
                src="https://i.postimg.cc/X7FQNyWY/Screenshot-2025-05-08-220612.png"
                alt="Mobile Banking"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-5">
              <h2 className="text-4xl font-bold text-indigo-400" style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #6366F1',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>Mobile Banking Integration</h2>
              <p className="text-gray-300">Link your existing mobile banking accounts for seamless bill payments. Our platform integrates with all major mobile banking services in Bangladesh.</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-indigo-500/20 rounded-lg text-center hover:bg-indigo-500/30 transition-colors duration-200 border border-gray-700">
                  <BsBank className="text-3xl text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm text-white">bKash</p>
                </div>
                <div className="p-4 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors duration-200 border border-gray-700">
                  <BsBank className="text-3xl text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-white">Nagad</p>
                </div>
                <div className="p-4 bg-orange-500/20 rounded-lg text-center hover:bg-orange-500/30 transition-colors duration-200 border border-gray-700">
                  <BsBank className="text-3xl text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-white">Rocket</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-cyan-400" style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #6EE7B7',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>Our Impact</h2>
            <p className="mt-2 text-gray-300">Trusted by thousands of Bangladeshis for their bill payments</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-white">100K+</div>
              <div className="text-lg text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">50+</div>
              <div className="text-lg text-gray-300">Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">5M+</div>
              <div className="text-lg text-gray-300">Bills Paid</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">99.9%</div>
              <div className="text-lg text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bill Reminders */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="w-full md:w-1/2">
              {/* Fixed the broken image URL */}
              <img
                src="https://www.bkash.com/uploaded_contents/campaigns/thumb_images/400x300-27_1707974513220.webp"
                alt="Bill Reminders"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-teal-400" style={{
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #22C55E',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>Never Miss a Due Date</h2>
              <p className="text-gray-300">Our smart reminder system alerts you before your bills are due. Set up SMS or email notifications and stay on top of your payments.</p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-full mr-4">
                    <BsCalendarCheck className="text-xl text-green-400" />
                  </div>
                  <p className="text-gray-300">Customizable reminder schedules</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-full mr-4">
                    <FaMobileAlt className="text-xl text-green-400" />
                  </div>
                  <p className="text-gray-300">SMS and email notifications</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-full mr-4">
                    <BsGraphUp className="text-xl text-green-400" />
                  </div>
                  <p className="text-gray-300">Monthly payment summary</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#23272f] to-[#18181b] py-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-lg mb-6">
            Ready to Simplify Your Bill Payments?
          </h1>
          <p className="text-xl text-gray-300 mb-8">Join thousands of happy customers who pay their bills with ease</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <Link to="/auth/register" className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold">
                Create Account
              </Link>
            )}
            <Link to="/bills" className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 font-semibold">
              Pay Your Bills
            </Link>
          </div>
        </div>
      </section>

      

      
    </div>
  );
};

export default Home;
