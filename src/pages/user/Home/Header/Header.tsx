import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { useAppDispatch } from "../../../../hooks";
import { signout } from "../../../../redux/authSlice";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleLogout = () => dispatch(signout());

  useEffect(() => {
    dispatch(fetchCategories({ page, pageSize: 15, search }));
  }, [dispatch, page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // ngăn form reload
    const trimmed = searchInput.trim();
    if (!trimmed) return; // bỏ qua nếu trống
    setPage(1);
    setSearch(trimmed); // nếu vẫn muốn lưu state search
    navigate(`/coursesfound?search=${trimmed}`);
  };
  console.log(handleSearch);
  return (
    <header className=" w-full border-b bg-white shadow-sm">
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

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
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
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
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
