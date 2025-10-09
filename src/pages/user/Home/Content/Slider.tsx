import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3000, // đổi slide mỗi 3s
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-box">
              <h2>Học ReactJS Miễn Phí!</h2>
              <p>
                Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học
                này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS.
              </p>
              <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Đăng ký ngay
              </button>
            </div>
            <div className="img-box">
              <img src="../src/assets/react.png" alt="ReactJS" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content-2">
            <div className="text-box">
              <h2>NodeJS Backend</h2>
              <p>
                Học cách xây dựng REST API với Express, Sequelize, và JWT
                Authentication.
              </p>
              <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Học ngay
              </button>
            </div>
            <div className="img-box">
              <img src="../src/assets/nodejs.png" alt="NodeJS" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Slider;
