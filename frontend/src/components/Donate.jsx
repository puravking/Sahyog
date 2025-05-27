import { useState } from "react";
import axios from "axios";
import QRCode from "../images/UPI.jpg";



export default function Donate({ campaignId, onDonationComplete }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (!name || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter valid details.");
      return;
    }

    try {
      await axios.put("http://localhost:5000/updateAmount", {
        campaignId,
        donatedAmount: numericAmount,
      });

      setSubmitted(true);
      onDonationComplete(); // optional callback
    } catch (error) {
      console.error("Error updating donation:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-8">
      {!submitted ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Make a Donation</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Donation Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 rounded"
            />
            <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Submit Donation
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">Scan this QR to make the payment:</p>
            <img src={QRCode} alt="UPI QR" className="mx-auto w-64 h-auto rounded shadow" />
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-600">Payment has been marked for checking.</h2>
          <p className="mt-2">Thank you for your support, {name}!</p>
        </div>
      )}
    </div>
  );
}
