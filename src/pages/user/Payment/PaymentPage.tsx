import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createPaymentIntent } from "../../../redux/paymentSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { clearCart } from "../../../redux/cartSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ========================== Checkout Form ==========================
const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement)!;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      alert(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      alert("🎉 Thanh toán thành công!");
      dispatch(clearCart());
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-3 rounded-md">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
      >
        {loading ? "Đang xử lý..." : "Thanh toán ngay"}
      </button>
    </form>
  );
};

// ========================== Main Payment Page ==========================
const PaymentPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { clientSecret, loading } = useAppSelector((state) => state.payment);

  // 1 khóa học hoặc nhiều khóa học
  const { courseId, courseTitle, coursePrice, courses } = location.state || {};

  const isMultiple = Array.isArray(courses);

  // ===== Tính tổng tiền =====
  const total = isMultiple
    ? courses.reduce((sum, c) => sum + Number(c.coursePrice || 0), 0)
    : Number(coursePrice || 0);

  useEffect(() => {
    if (userId) {
      if (isMultiple && courses?.length > 0) {
        // Thanh toán nhiều khóa học
        const courseId = courses.map((c) => c.courseId);
        dispatch(createPaymentIntent({ courseId, userId }));
      } else if (courseId) {
        // Thanh toán 1 khóa học
        dispatch(createPaymentIntent({ courseId, userId }));
      }
    }
  }, [userId, courseId, courses, isMultiple, dispatch]);

  if (loading || !clientSecret) return <p>Đang tạo đơn thanh toán...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ===== Left: Billing & Card Info ===== */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <p className="text-sm text-gray-500 mb-6">
          Chúng tôi có thể thu thêm thuế tuỳ theo quy định địa phương.
        </p>

        {/* Card payment */}
        <h3 className="font-semibold mb-3">Phương thức thanh toán</h3>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      </div>

      {/* ===== Right: Order summary ===== */}
      <div className="border rounded-md p-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h3>

        {isMultiple ? (
          <>
            {courses.map((course) => (
              <div
                key={course.courseId}
                className="flex justify-between mb-2 text-sm"
              >
                <span className="truncate w-2/3">{course.courseTitle}</span>
                <span className="font-medium">
                  {course.coursePrice.toLocaleString()}₫
                </span>
              </div>
            ))}
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString()}₫</span>
            </p>
          </>
        ) : (
          <>
            <p className="flex justify-between mb-2">
              <span>Khóa học:</span>
              <span className="font-semibold">{courseTitle}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Giá:</span>
              <span className="font-semibold">
                {Number(coursePrice).toLocaleString()}₫
              </span>
            </p>
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span>{Number(coursePrice).toLocaleString()}₫</span>
            </p>
          </>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-1">
            💸 Chính sách hoàn tiền trong 30 ngày
          </p>
          <p>Nếu không hài lòng, bạn có thể được hoàn tiền 100%.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
