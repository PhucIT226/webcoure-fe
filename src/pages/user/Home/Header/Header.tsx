import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { signout } from "../../../../redux/authSlice";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../../redux/categorySlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { removeFromCart, clearCart } from "../../../../redux/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userid = useAppSelector((state) => state.auth.user?.id);
  const userRole = useAppSelector((state) => state.auth.user?.roleId);
  console.log(userRole);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const [searchInput, setSearchInput] = useState("");

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleLogout = () => dispatch(signout());

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) return;
    navigate(`/coursesfound?search=${trimmed}`);
  };

  // ✅ Hàm xử lý xóa 1 item
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <header className="w-full border-b bg-base-100 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-semibold text-primary">
          Học dễ thôi
        </NavLink>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/3 gap-2"
        >
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            placeholder="Tìm kiếm khóa học..."
            className="border rounded-lg px-3 py-2 w-full"
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>

        {/* Auth & Cart */}
        <div className="flex items-center gap-3">
          {/* Cart dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <FaCartShopping className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 bg-white text-gray-800 border border-gray-200 shadow-lg rounded-md"
            >
              <DropdownMenuLabel>🛒 Giỏ hàng của bạn</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-2">Giỏ hàng trống</p>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center gap-2 px-2 py-1 hover:bg-gray-50"
                      >
                        <div
                          onClick={() => navigate(`/course/${item.id}`)}
                          className="cursor-pointer flex-1"
                        >
                          <p className="truncate font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {item.price.toLocaleString()}₫
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id!)} // ✅ Nút xóa
                          className="text-red-500 hover:text-red-600"
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>

                  <DropdownMenuSeparator />

                  {/* ✅ Hàng nút hành động */}
                  <div className="flex justify-between items-center px-3 py-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/check-cart")}
                    >
                      Thanh toán
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => dispatch(clearCart())}
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {!isAuthenticated ? (
            <>
              <Button variant="ghost" onClick={handleLogin}>
                Sign in
              </Button>
              <Button variant="ghost" onClick={handleRegister}>
                Sign up
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Settings</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-white text-gray-800 border border-gray-200 shadow-lg rounded-md"
              >
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/profile/${userid}`)}
                >
                  Profile
                </DropdownMenuItem>
                {userRole === import.meta.env.VITE_ADMIN_ROLE_ID && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Admin
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
