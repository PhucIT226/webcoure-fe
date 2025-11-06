import { Button } from "../../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "../../../redux/cartSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log(cartItems);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        courses: cartItems.map((course) => ({
          courseId: course.id,
          courseTitle: course.title,
          coursePrice: course.price,
        })),
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">🛒 Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Danh sách khóa học */}
          <div className="flex-1 space-y-6">
            <p className="text-lg font-semibold">
              {cartItems.length} Course{cartItems.length > 1 ? "s" : ""} in Cart
            </p>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4"
              >
                {/* Hình ảnh */}
                <img
                  src={`http://localhost:3000${item.thumbnailUrl}`}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Thông tin khóa học */}
                <div className="flex-1">
                  <h2
                    className="font-semibold text-lg cursor-pointer hover:underline"
                    onClick={() => navigate(`/course/${item.id}`)}
                  >
                    {item.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemove(item.id!)}
                    >
                      Remove
                    </Button>
                    <Button variant="ghost" size="sm">
                      Save for Later
                    </Button>
                  </div>
                </div>

                {/* Giá */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.price.toLocaleString()}₫
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Tổng tiền + nút checkout */}
          <div className="md:w-80 flex-shrink-0 border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Total:</h2>
            <p className="text-2xl font-bold text-purple-600 mb-2">
              {total.toLocaleString()}₫
            </p>
            <p className="text-sm text-gray-500 mb-4">
              (Giảm giá lên đến 82% so với giá gốc)
            </p>

            <Button className="w-full mb-3" onClick={handleCheckout}>
              Proceed to Checkout →
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
