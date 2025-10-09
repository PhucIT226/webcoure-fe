import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    // DaisyUI sử dụng data-theme chứ không dùng class "dark"
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`btn btn-sm rounded-full ${className || ""}`}
    >
      {dark ? (
        <FaMoon className="text-yellow-400 w-4 h-4" />
      ) : (
        <FaSun className="text-yellow-400 w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
