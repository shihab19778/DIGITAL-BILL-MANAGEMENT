import { Outlet } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;