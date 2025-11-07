import { Route, Routes } from "react-router-dom";
import Maintenance from "./pages/admin/maintenance/MaintenancePage";

// User pages
import User from "./pages/user/user";
import Home from "./pages/user/Home/Home";
import DetailCourse from "./pages/user/Home/Content/DetailCourse";
import CourseVid from "./pages/user/Home/Content/CourseVid";
import SearchCourses from "./pages/user/Home/Header/SearchCourse";
import Login from "./Auth/login";
import Register from "./Auth/register";
import { Bounce, ToastContainer } from "react-toastify";
import PaymentPage from "./pages/user/Payment/PaymentPage";
import UserProfile from "./pages/user/Home/Header/UserProfile";
import VerifyEmail from "./pages/user/Email/verifyEmail";
import CheckEmail from "./pages/user/Email/checkEmail";

// Admin pages
import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard/dashboard";
import CourseList from "./pages/admin/courses/courses";
import CourseDetail from "./components/admin/courses/CourseDetail";
import CourseCreate from "./pages/admin/courses/Course-create";
import CourseEdit from "./pages/admin/courses/Course-edit";
import UserList from "./pages/admin/users/users";
import UserDetail from "./components/admin/users/UserDetail";
import UserCreate from "./pages/admin/users/user-create";
import UserEdit from "./pages/admin/users/user-edit";
import CategoryList from "./pages/admin/categories/categories";
import CategoryDetail from "./components/admin/categories/CategoryDetail";
import CategoryCreate from "./pages/admin/categories/category-create";
import CategoryEdit from "./pages/admin/categories/category-edit";
import OrderList from "./pages/admin/orders/orders";
import OrderDetail from "./components/admin/orders/OrderDetail";
import ReviewList from "./pages/admin/reviews/reviews";
import ReviewDetail from "./components/admin/reviews/ReviewDetail";
import CouponList from "./pages/admin/coupons/coupons";
import CouponDetail from "./components/admin/coupons/CouponDetail";
import CouponCreate from "./pages/admin/coupons/coupon-create";
import CouponEdit from "./pages/admin/coupons/coupon-edit";
import Setting from "./pages/admin/setting/setting";
import ChatBot from "./pages/admin/chat/AdminChat";
import CartPage from "./pages/user/Payment/CartPage";

function App() {
  // Cho admin vẫn vào bình thường
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          <Route path="/course/:id" element={<DetailCourse />} />
          <Route path="/coursevid/:id" element={<CourseVid />} />
          <Route path="/coursesfound" element={<SearchCourses />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />

          {/* Course routes */}
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path="create" element={<CourseCreate />} />
            <Route path=":id" element={<CourseDetail />} />
            <Route path=":id/edit" element={<CourseEdit />} />
          </Route>

          {/* User routes */}
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="create" element={<UserCreate />} />
            <Route path=":id" element={<UserDetail />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>

          {/* Category routes */}
          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path="create" element={<CategoryCreate />} />
            <Route path=":id" element={<CategoryDetail />} />
            <Route path=":id/edit" element={<CategoryEdit />} />
          </Route>

          {/* Order routes */}
          <Route path="orders">
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderDetail />} />
          </Route>

          {/* Review routes */}
          <Route path="reviews">
            <Route index element={<ReviewList />} />
            <Route path=":id" element={<ReviewDetail />} />
          </Route>

          {/* Coupon routes */}
          <Route path="coupons">
            <Route index element={<CouponList />} />
            <Route path="create" element={<CouponCreate />} />
            <Route path=":id" element={<CouponDetail />} />
            <Route path=":id/edit" element={<CouponEdit />} />
          </Route>

          {/* Setting routes */}
          <Route path="setting" element={<Setting />} />

          {/* ChatBot routes */}
          <Route path="chatbot" element={<ChatBot />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="auth/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/checkmail" element={<CheckEmail />} />
        <Route path="/check-cart" element={<CartPage />} />

        {/* Maintenance route để FE redirect */}
        {!isAdminRoute && (
          <Route path="/maintenance" element={<Maintenance />} />
        )}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
