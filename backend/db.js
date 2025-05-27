const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI;
mongoose.connect(db);

// User schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
});

// Updated campaign schema with amountNeeded and category
const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  contactEmail: { type: String, required: true },
  category: { type: String, required: true, enum: ["water", "ngo", "health", "education", "startup", "environment"] },
  moneyRequired: { type: Number, required: true, min: 0 },
  moneyCollected: { type: Number, required: true, min: 0 },
});

const Campaign = mongoose.model("Campaign", campaignSchema);

const User = mongoose.model("User", userSchema);
// const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = {
    User,
    Campaign
};
