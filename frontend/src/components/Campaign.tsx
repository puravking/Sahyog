import { useEffect, useState } from "react";
import axios from "axios";

import healthImg from "../images/health.jpeg";
import educationImg from "../images/education.jpeg";
import ngoImg from "../images/cleanWater.jpeg";
import startupsImg from "../images/cleanWater.jpeg";
import environmentImg from "../images/cleanWater.jpeg";
import cleanWater from "../images/cleanWater.jpeg"; // fallback image
import { useNavigate } from "react-router-dom";

type CampaignType = {
  _id: string;
  title: string;
  category: string;
  description: string;
  needed: number;
  remaining: number;
};
  
const categoryImages: Record<string, string> = {
  Health: healthImg,
  Education: educationImg,
  NGO: ngoImg,
  Startups: startupsImg,
  Environment: environmentImg,
};

export default function Campaign() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/campaigns")
      .then((res) => {
        setCampaigns(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch campaigns:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const allCategories = ["All", ...Array.from(new Set(campaigns.map((c) => c.category)))];

  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((c) => c.category === selectedCategory);

  if (loading) {
    return <div className="p-8 text-center">Loading campaigns...</div>;
  }

  return (
    <div className="px-4 py-12 bg-gray-100">
      <div className="flex flex-col gap-2 justify-center text-center mb-8">
        <p className="text-3xl font-bold">Featured Campaigns</p>
        <p className="text-gray-500 font-semibold max-w-2xl mx-auto">
          These campaigns have been carefully selected for their impact potential.
          Explore these worthy causes and discover how you can make a difference.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {allCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-orange-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.length === 0 ? (
          <p>No campaigns available in this category.</p>
        ) : (
          filteredCampaigns.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={categoryImages[item.category] || cleanWater}
                alt={item.title}
              />
              <div className="p-4">
                <span className="inline-block mb-2 text-white text-xs font-medium px-2 py-1 bg-orange-400 rounded">
                  {item.category}
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
              <div className="flex justify-between items-center px-4 pb-4">
                <div className="text-sm text-gray-700 mt-2">
                  <p>
                    <strong>Needed:</strong> {item.needed}
                  </p>
                  <p>
                    <strong>Remaining:</strong> {item.remaining}
                  </p>
                </div>
                <button onClick={()=>navigate("/donate")} className="bg-green-200 rounded-lg p-2 h-10 mt-2">
                  Donate now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
