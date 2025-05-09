// src/Pages/BillDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { FaSpinner, FaArrowLeft, FaWallet, FaMoneyBillWave, FaCalendarAlt, FaFileInvoiceDollar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BillDetails = () => {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { payBill, balance } = useContext(AuthContext);
  
  useEffect(() => {
    // Fetch bills data
    fetch('/bills.json')
      .then(res => res.json())
      .then(data => {
        const foundBill = data.find(b => b.id === parseInt(id));
        if (foundBill) {
          setBill(foundBill);
        } else {
          toast.error('Bill not found');
          navigate('/bills');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading bill details:', error);
        toast.error('Failed to load bill details');
        setLoading(false);
      });
      
    // Check if bill is already paid
    const paidBills = JSON.parse(localStorage.getItem('paidBills') || '[]');
    if (paidBills.includes(parseInt(id))) {
      toast.error('This bill has already been paid');
      navigate('/bills');
    }
  }, [id, navigate]);
  
  const handlePayBill = () => {
    if (!bill) return;
    
    setIsPaying(true);
    const result = payBill(bill.amount);
    
    if (result.success) {
      // Mark bill as paid in local storage
      const paidBills = JSON.parse(localStorage.getItem('paidBills') || '[]');
      paidBills.push(bill.id);
      localStorage.setItem('paidBills', JSON.stringify(paidBills));
      
      toast.success(result.message);
      setTimeout(() => {
        navigate('/bills');
      }, 1500);
    } else {
      toast.error(result.message);
      setIsPaying(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }
  
  if (!bill) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Bill not found</h2>
        <button 
          onClick={() => navigate('/bills')}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="mr-2" />
          Back to Bills
        </button>
      </div>
    );
  }

  const canPay = balance >= bill.amount;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center relative">
            <div className="w-32 h-32 md:w-48 md:h-48 mb-4">
              <img 
                src={bill.icon} 
                alt={bill.organization} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gray-800 rounded-full p-2 flex items-center justify-center">
              <img 
                src={bill.icon} 
                alt={bill.bill_type} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{bill.organization}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaFileInvoiceDollar className="text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Bill Type</p>
                  <p className="font-medium capitalize">{bill.bill_type}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaMoneyBillWave className="text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-2xl font-bold">৳{bill.amount.toLocaleString()} BDT</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Due Date</p>
                  <p className="font-medium">{new Date(bill.due_date || bill["due-date"]).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaWallet className="text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Your Balance</p>
                  <p className="font-medium">৳{balance.toLocaleString()} BDT</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayBill}
                disabled={!canPay || isPaying}
                className={`w-full md:w-auto py-3 px-8 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  canPay 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isPaying ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaMoneyBillWave />
                    <span>{canPay ? 'Pay Bill' : 'Insufficient Balance'}</span>
                  </>
                )}
              </motion.button>

              {!canPay && (
                <p className="text-red-400 text-sm mt-2">
                  You need ৳{(bill.amount - balance).toLocaleString()} more to pay this bill
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BillDetails;