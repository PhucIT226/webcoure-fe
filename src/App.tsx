import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/user/Home/Home";
import Login from "./Auth/login";
import Register from "./Auth/register";

import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard/dashboard";
import CourseList from "./pages/admin/courses/course-list";
import CourseDetail from "./components/admin/CourseDetail";
import UserList from "./pages/admin/users/user-list";
import InstructorList from "./pages/admin/instructors/instructor-list";
import CategoryList from "./pages/admin/categories/category-list";
import CategoryDetail from "./components/admin/CategoryDetail";
import OrderList from "./pages/admin/orders/order-list";
import ReviewList from "./pages/admin/reviews/review-list";
import CouponList from "./pages/admin/coupons/coupon-list";
import Profile from "./pages/admin/setting/profile";
import User from "./pages/user/user";
import DetailCourse from "./pages/user/Home/Content/DetailCourse";
import CourseVid from "./pages/user/Home/Content/CourseVid";
import SearchCourses from "./pages/user/Home/Header/SearchCourse";

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<User />}>
        <Route index element={<Home />} />
        <Route path="/course/:id" element={<DetailCourse />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="course-list" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDetail />} />
        <Route path="student-list" element={<UserList />} />
        <Route path="user-list" element={<UserList />} />
        <Route path="instructor-list" element={<InstructorList />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="category/:id" element={<CategoryDetail />} />
        <Route path="order-list" element={<OrderList />} />
        <Route path="review-list" element={<ReviewList />} />
        <Route path="coupon-list" element={<CouponList />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/coursevid" element={<CourseVid />} />
      <Route path="/coursesfound" element={<SearchCourses />} />
    </Routes>
  );
}

export default App;
