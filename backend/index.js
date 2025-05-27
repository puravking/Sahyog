require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Campaign } = require("./db"); // Assuming you have mongoose models here

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// -------- AUTH ROUTES --------

// Login Route
app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Signup Route
app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// -------- CAMPAIGN ROUTES --------

const allowedCategories = [
  "water",
  "ngo",
  "health",
  "education",
  "startup",
  "environment",
];

// Create a new campaign
app.post("/campaign", async (req, res) => {
  try {
    const { name, description, startDate, endDate, contactEmail, category,moneyRequired,moneyCollected } = req.body;

    // Basic validation
    if (!name || !description || !startDate || !endDate || !contactEmail || !category) {
      return res.status(400).json({ message: "All fields including category are required" });
    }

    if (!allowedCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: "End date cannot be before start date" });
    }

    const newCampaign = new Campaign({
      name,
      description,
      startDate,
      endDate,
      contactEmail,
      category: category.toLowerCase(),
      moneyRequired,
      moneyCollected
    });

    await newCampaign.save();
    res.status(201).json({ message: "Campaign registered successfully", campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch all campaigns
app.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Update campaign amount after donation
app.put("/updateAmount", async (req, res) => {
  const { campaignId, donatedAmount } = req.body;

  if (!campaignId || !donatedAmount) {
    return res.status(400).json({ message: "campaignId and donatedAmount are required" });
  }

  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (typeof campaign.amountNeeded !== "number") {
      return res.status(400).json({ message: "Campaign does not have a valid amountNeeded field" });
    }

    campaign.amountNeeded = Math.max(0, campaign.amountNeeded - donatedAmount);
    await campaign.save();

    res.status(200).json({ message: "Donation applied successfully", updatedCampaign: campaign });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
