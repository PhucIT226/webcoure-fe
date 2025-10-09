import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import "../../../../styles/user/home/footer.scss";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="about">
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <div className="flex flex-col space-y-2 text-gray-300">
              <a href="#" className="hover:text-white">
                About us
              </a>
              <a href="#" className="hover:text-white">
                Contact us
              </a>
              <a href="#" className="hover:text-white">
                Investor
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="explore">
            <h3 className="text-lg font-semibold mb-3">Explore Course</h3>
            <div className="flex flex-col space-y-2 text-gray-300">
              <a href="#" className="hover:text-white">
                For children from 4 to 17 years old
              </a>
              <a href="#" className="hover:text-white">
                For students and workers
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="social-media">
            <h3 className="text-lg font-semibold mb-3">Our social media</h3>
            <div className="icon flex gap-4 text-2xl">
              <a
                href="#"
                className="facebook hover:text-blue-500 transition transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="youtube hover:text-red-500 transition transform hover:scale-110"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="tiktok hover:text-gray-300 transition transform hover:scale-110"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Hotline */}
          <div className="hotline md:pt-0 pt-5">
            <h3 className="text-lg font-semibold mb-3">Hotline</h3>
            <p className="text-gray-300">Phone number: 200312312</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
