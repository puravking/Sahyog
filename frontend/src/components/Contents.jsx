import { motion } from "framer-motion";
import Campaign from "./Campaign";
import helpingEachOther2 from "../images/helpingEachOther2.jpeg";
import helpingEachOther1 from "../images/helpingEachOther.jpeg";
import { HeartHandshake, Users, Globe, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contents() {
  const navigate = useNavigate();

  const stats = [
    { icon: <HeartHandshake size={32} />, count: "520+", label: "Campaigns Funded" },
    { icon: <Users size={32} />, count: "15000+", label: "Donors" },
    { icon: <Globe size={32} />, count: "32", label: "Countries Reached" },
    { icon: <DollarSign size={32} />, count: "$2.5M+", label: "Funds Raised" },
  ];

  return (
    <div className="px-4 py-14 max-w-7xl mx-auto space-y-14">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-center justify-between gap-10"
      >
        {/* Left Side with background image */}
        <div className="relative w-full lg:w-1/2">
          <img
            src={helpingEachOther1}
            alt="Header background"
            className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10 rounded-xl"
          />
          <div className="text-center space-y-5 px-6 py-28 relative z-10">
            <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              Make a Difference Today
            </p>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Join our community of changemakers and help fund vital projects. Every donation makes a real impact in someone's life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/campaign")}
                className="bg-orange-500 px-6 py-3 text-white rounded-full shadow-md hover:bg-orange-600 transition"
              >
                Explore Campaigns
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/startACampaign")}
                className="bg-blue-500 px-6 py-3 text-white rounded-full shadow-md hover:bg-blue-600 transition"
              >
                Start a Campaign
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full lg:w-1/2"
        >
          <img
            className="mx-auto rounded-xl shadow-md"
            src={helpingEachOther2}
            alt="Helping each other"
          />
        </motion.div>
      </motion.div>

      {/* Impact Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center space-y-4"
      >
        <p className="text-3xl sm:text-4xl font-bold">Our Impact</p>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Through the generosity of our donors and the dedication of campaign organizers, we've been able to make a significant difference around the world.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white border p-6 rounded-xl flex flex-col items-center gap-3 text-center shadow-md hover:shadow-xl transition"
          >
            <div className="text-blue-500">{item.icon}</div>
            <p className="text-2xl font-bold">{item.count}</p>
            <p className="text-gray-600">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Campaigns Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10"
      >
        <Campaign />
      </motion.div>
    </div>
  );
}
