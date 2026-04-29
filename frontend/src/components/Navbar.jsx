import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Profile from "../pages/Profile";

const Navbar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 🔥 mobile menu state

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="w-full bg-purple-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* LEFT - Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-white cursor-pointer"
      >
        AI.Captioner
      </h1>

      {/* RIGHT - DESKTOP */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <div
              onClick={() => setShowProfile(true)}
              className="text-white text-xl border-2 rounded-full px-2 py-1 cursor-pointer"
            >
              <i className="ri-user-add-fill"></i>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-md text-purple-600 bg-white font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-md text-purple-600 bg-white font-semibold"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="text-white hover:font-bold"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* 🔥 MOBILE MENU ICON */}
      <div className="md:hidden text-white text-2xl cursor-pointer">
        <i
          className={menuOpen ? "ri-close-line" : "ri-menu-line"}
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>
      </div>

      {/* 🔥 MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-purple-600 flex flex-col items-center gap-4 py-6 shadow-lg md:hidden">
          
          {isLoggedIn ? (
            <>
              <div
                onClick={() => {
                  setShowProfile(true);
                  setMenuOpen(false);
                }}
                className="text-white text-xl border-2 rounded-full px-3 py-1 cursor-pointer"
              >
                <i className="ri-user-add-fill"></i>
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-6 py-2 bg-white text-purple-600 rounded-md font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="px-6 py-2 bg-white text-purple-600 rounded-md font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
                className="text-white"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default Navbar;