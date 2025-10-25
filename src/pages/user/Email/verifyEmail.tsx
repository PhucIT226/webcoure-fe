import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { resetVerify, verifyEmail } from "../../../redux/authSlice";

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const { verifyStatus, verifyMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;
    dispatch(verifyEmail(token));
    return () => {
      dispatch(resetVerify());
    };
  }, [token, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6">
      {verifyStatus === "loading" && (
        <h1 className="text-2xl font-semibold text-gray-700 animate-pulse">
          Đang xác minh email của bạn...
        </h1>
      )}

      {verifyStatus === "success" && (
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md">
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            ✅ Xác minh thành công!
          </h1>
          <p className="text-gray-700 mb-6">{verifyMessage}</p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Đăng nhập ngay
          </a>
        </div>
      )}

      {verifyStatus === "error" && (
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-3">
            ❌ Xác minh thất bại
          </h1>
          <p className="text-gray-700 mb-6">{verifyMessage}</p>
          <a
            href="/register"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Đăng ký lại
          </a>
        </div>
      )}
    </div>
  );
}
