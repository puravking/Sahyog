import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../images/logowithoutbg.png";

export default function Topbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    setIsAuthenticated(!!token);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-green-100 shadow-md px-6 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img src={Logo} className="h-10 w-10 object-contain" alt="Logo" />
            <span className="text-green-900 font-bold text-lg sm:text-xl">Sahyog</span>
          </div>

          <div className="hidden md:flex gap-6 text-green-800 font-medium text-sm sm:text-base">
            <p onClick={() => navigate("/home")} className="cursor-pointer hover:text-green-900 transition">Home</p>
            <p onClick={() => navigate("/about")} className="cursor-pointer hover:text-green-900 transition">About</p>
            <p onClick={() => navigate("/motive")} className="cursor-pointer hover:text-green-900 transition">Our Motive</p>
            <p onClick={() => navigate("/campaign")} className="cursor-pointer hover:text-green-900 transition">Campaigns</p>
            <p onClick={() => navigate("/contact")} className="cursor-pointer hover:text-green-900 transition">Contact</p>
          </div>

          <div className="hidden sm:flex gap-3">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-1.5 rounded-lg shadow-md text-sm sm:text-base">
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="bg-green-700 hover:bg-green-800 text-white px-5 py-1.5 rounded-lg shadow-md text-sm sm:text-base">
                  Login
                </button>
                <button onClick={() => navigate("/signup")} className="bg-green-700 hover:bg-green-800 text-white px-5 py-1.5 rounded-lg shadow-md text-sm sm:text-base">
                  Signup
                </button>
              </>
            )}
          </div>

          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-green-50 mt-3 px-4 py-2 rounded shadow">
            <p onClick={() => { navigate("/home"); setMenuOpen(false); }} className="py-2 text-green-800 font-medium cursor-pointer hover:text-green-900">Home</p>
            <p onClick={() => { navigate("/about"); setMenuOpen(false); }} className="py-2 text-green-800 font-medium cursor-pointer hover:text-green-900">About</p>
            <p onClick={() => { navigate("/motive"); setMenuOpen(false); }} className="py-2 text-green-800 font-medium cursor-pointer hover:text-green-900">Our Motive</p>
            <p onClick={() => { navigate("/campaign"); setMenuOpen(false); }} className="py-2 text-green-800 font-medium cursor-pointer hover:text-green-900">Campaigns</p>
            <p onClick={() => { navigate("/contact"); setMenuOpen(false); }} className="py-2 text-green-800 font-medium cursor-pointer hover:text-green-900">Contact us</p>
            <hr className="my-2" />
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-2">
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mb-2">
                  Login
                </button>
                <button onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded">
                  Signup
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Welcome Message */}
      {isAuthenticated && username && (
        <div className="bg-white border border-green-100 shadow-lg max-w-3xl mx-auto mt-6 p-6 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-green-800">Welcome to Sahyog</h2>
          <p className="mt-2 text-gray-700 text-base">
            <p>Sahyog — जहाँ करुणा बनती है किसी की उम्मीद,</p>
            <p>Where your one step can light up a hundred lives.</p>
            <p>Join hands, spread smiles — ‘Ek chhoti si madad, ek badi si muskaan.’</p>
            <p>Be the change, kyunki insaaniyat se bada koi dharm nahi hota.</p>
          </p>
        </div>
      )}
    </>
  );
}
