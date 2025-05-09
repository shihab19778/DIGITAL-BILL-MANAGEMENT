// src/Pages/Bills.jsx - Updated to handle URL parameters
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaFilter, FaSearch, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [paidBills, setPaidBills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Read the URL search parameters
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');

  // Load bills from local storage if available
  useEffect(() => {
    const savedPaidBills = localStorage.getItem('paidBills');
    if (savedPaidBills) {
      setPaidBills(JSON.parse(savedPaidBills));
    }
    
    // Fetch bills data
    fetch('/bills.json')
      .then(res => res.json())
      .then(data => {
        setBills(data);
        
        // If a type parameter exists in the URL, use it for initial filtering
        if (typeFromUrl) {
          setSelectedType(typeFromUrl);
          setFilteredBills(data.filter(bill => bill.bill_type === typeFromUrl));
        } else {
          setFilteredBills(data);
        }
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading bills:', error);
        setLoading(false);
      });
  }, [typeFromUrl]);

  // Filter bills by type and search query
  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterBills(type, searchQuery);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterBills(selectedType, query);
  };

  const filterBills = (type, query) => {
    let filtered = bills;
    
    if (type !== 'all') {
      filtered = filtered.filter(bill => bill.bill_type === type);
    }
    
    if (query) {
      filtered = filtered.filter(bill => 
        bill.organization.toLowerCase().includes(query.toLowerCase()) ||
        bill.bill_type.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredBills(filtered);
  };

  // Get unique bill types for filter dropdown
  const billTypes = ['all', ...new Set(bills.map(bill => bill.bill_type))];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-white"
        >
          Your Bills
        </motion.h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search bills..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-12 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative w-full md:w-64">
            <select 
              value={selectedType}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 pl-12 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {billTypes.map(type => (
                <option key={type} value={type} className="bg-gray-800 text-gray-200">
                  {type === 'all' ? 'All Bills' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Bills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-700 p-2">
                        <img 
                          src={bill.icon} 
                          alt={bill.organization} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{bill.organization}</h3>
                        <p className="text-gray-400 capitalize">{bill.bill_type}</p>
                      </div>
                    </div>
                    {paidBills.includes(bill.id) && (
                      <div className="flex items-center text-green-500">
                        <FaCheckCircle className="mr-2" />
                        <span>Paid</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <FaMoneyBillWave className="mr-2 text-blue-400" />
                      <span className="font-medium">{bill.amount} BDT</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaCalendarAlt className="mr-2 text-blue-400" />
                      <span>Due: {new Date(bill.due_date || bill["due-date"]).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {!paidBills.includes(bill.id) && (
                    <Link 
                      to={`/bills/${bill.id}`}
                      className="mt-6 block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Pay Now
                    </Link>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg">
                No bills found matching your criteria.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;