import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import type { LoginForm } from "../types/auth";
import { useAppDispatch } from "../hooks";
import { signin } from "../redux/authSlice";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  isRemember: yup.boolean().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { isRemember: false },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await dispatch(signin(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="bg-base-300 shadow-md rounded-xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center mb-6 text-base-content">
          Đăng nhập
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-base-content font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              {...register("email")}
              placeholder="Nhập email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-base-content font-medium mb-1"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              placeholder="Nhập mật khẩu"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right mb-4">
            <a
              href="#"
              className="text-sm text-indigo-500 hover:underline font-medium"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full flex justify-center items-center bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && (
              <FaSpinner className="absolute left-4 animate-spin text-white text-lg" />
            )}
            <span>Đăng Nhập</span>
          </button>
        </form>

        <p className="text-center text-base-content mt-6">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline font-medium cursor-pointer"
          >
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
