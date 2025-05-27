import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-green-800 text-white py-10 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left: Info */}
        <div>
          <h3 className="text-2xl font-bold mb-2 text-green-100">Purav Foundation</h3>
          <p className="text-sm text-green-200">
            Empowering changemakers and visionaries through community-funded support.
            Join us in creating a future where every idea gets the push it deserves.
          </p>
          <p className="mt-4 text-green-300 font-semibold">CEO + Founder: Purav</p>
        </div>

        {/* Middle: Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold text-green-100 mb-2">Quick Links</h4>
          <button onClick={() => navigate("/home")} className="hover:text-green-300 text-sm text-left">
            Home
          </button>
          <button onClick={() => navigate("/about")} className="hover:text-green-300 text-sm text-left">
            About
          </button>
          <button onClick={() => navigate("/motive")} className="hover:text-green-300 text-sm text-left">
            Purpose
          </button>
          <button onClick={() => navigate("/login")} className="hover:text-green-300 text-sm text-left">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="hover:text-green-300 text-sm text-left">
            Signup
          </button>
        </div>

        {/* Right: Social Links */}
        <div>
          <h4 className="text-xl font-semibold text-green-100 mb-2">Connect with Me</h4>
          <div className="flex gap-5 text-2xl">
            <a href="https://www.instagram.com/pu_rav123/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <FaInstagram />
            </a>
            <a href="https://x.com/puravking" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/purav-5641b7254/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/puravking" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-green-300 mt-10 border-t border-green-600 pt-4">
        &copy; {new Date().getFullYear()} Purav Foundation. All rights reserved.
      </div>
    </footer>
  );
}
