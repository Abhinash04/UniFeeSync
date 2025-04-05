import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <Outlet />
      </main>
      <div className="mb-4">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
