import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../pages/user/Home/Header/Header";
import Slider from "../pages/user/Home/Content/Slider";
import Footer from "../pages/user/Home/Footer/Footer";

type UserLayoutProps = {
  children: ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="swiper-container mb-5">{isHome && <Slider />}</div>
      <main>
        <Outlet />
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
};

export default UserLayout;
