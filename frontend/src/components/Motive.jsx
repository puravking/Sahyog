import { useNavigate } from "react-router-dom";
import profilePic from "../images/profilePic.jpg";

export default function Motive() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-green-100 to-white rounded-3xl shadow-2xl mt-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-800 mb-10 leading-snug">
        My Purpose Behind This Platform
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Section */}
        <div className="relative shrink-0">
          <img
            src={profilePic}
            alt="CEO Profile"
            className="w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-full shadow-xl border-4 border-green-500"
          />
          <p className="absolute bottom-0 left-0 bg-green-700 text-white px-3 py-1 text-xs sm:text-sm rounded-tr-xl rounded-bl-xl shadow-md">
            CEO, Purav
          </p>
        </div>

        {/* Text Section */}
        <div className="text-gray-700 text-base sm:text-lg leading-relaxed bg-white p-6 sm:p-8 rounded-xl shadow-md w-full">
          <p className="mb-4 italic text-green-700 font-medium border-l-4 border-green-400 pl-4 text-sm sm:text-base">
            "Passion without support fades fast. I built this platform to ensure no dream gets left behind due to lack of funding."
          </p>
          <p>
            From a young age, I’ve always been passionate about starting my own business and launching impactful NGOs.
            However, the reality of financial challenges made that dream difficult. That’s why I built this website —
            a space where vision meets support. Here, people can fund startups, NGOs, and grassroots communities focused
            on health, education, and sustainability.
          </p>
        </div>

      </div>
      <button
  onClick={() => navigate("/")}
  className="cursor-pointer mt-10 mx-auto block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 ease-in-out"
>
  ← Back to Home
</button>
    </div>
  );
}
