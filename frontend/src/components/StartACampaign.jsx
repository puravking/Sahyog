import { useState } from "react";
import axios from "axios";

export default function StartACampaign() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    contactEmail: "",
    category: "",
    moneyRequired: "",
    moneyCollected: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const categories = ["water", "ngo", "health", "education", "startup", "environment"];

  const validate = () => {
    const newErrors= {};
    if (!form.name.trim()) newErrors.name = "Campaign name is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.startDate) newErrors.startDate = "Start date is required.";
    if (!form.endDate) newErrors.endDate = "End date is required.";
    else if (form.endDate < form.startDate) newErrors.endDate = "End date cannot be before start date.";
    if (!form.contactEmail.trim()) newErrors.contactEmail = "Contact email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) newErrors.contactEmail = "Invalid email address.";
    if (!form.category) newErrors.category = "Category is required.";

    if (!form.moneyRequired) newErrors.moneyRequired = "Money required is required.";
    else if (isNaN(Number(form.moneyRequired)) || Number(form.moneyRequired) < 0)
      newErrors.moneyRequired = "Money required must be a non-negative number.";

    if (!form.moneyCollected) newErrors.moneyCollected = "Money collected is required.";
    else if (isNaN(Number(form.moneyCollected)) || Number(form.moneyCollected) < 0)
      newErrors.moneyCollected = "Money collected must be a non-negative number.";

    return newErrors;
  };

  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post("http://localhost:5000/campaign", form);

      if (response.status !== 200 && response.status !== 201) {
        setErrors({ submit: "Failed to register campaign." });
        return;
      }

      setSubmitted(true);
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "Network error. Please try again." });
      }
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-green-50 rounded shadow text-green-900 font-semibold text-center">
        Thank you for registering your campaign! We will review it shortly.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-900">Start a New Campaign</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Campaign Name */}
        <label className="block mb-3">
          <span className="block text-green-800 font-semibold mb-1">Campaign Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name}</p>}
        </label>

        {/* Description */}
        <label className="block mb-3">
          <span className="block text-green-800 font-semibold mb-1">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.description && <p className="text-red-600 mt-1 text-sm">{errors.description}</p>}
        </label>

        {/* Start Date */}
        <label className="block mb-3">
          <span className="block text-green-800 font-semibold mb-1">Start Date</span>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.startDate ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.startDate && <p className="text-red-600 mt-1 text-sm">{errors.startDate}</p>}
        </label>

        {/* End Date */}
        <label className="block mb-3">
          <span className="block text-green-800 font-semibold mb-1">End Date</span>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.endDate ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.endDate && <p className="text-red-600 mt-1 text-sm">{errors.endDate}</p>}
        </label>

        {/* Category */}
        <label className="block mb-3">
          <span className="block text-green-800 font-semibold mb-1">Category</span>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.category ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 mt-1 text-sm">{errors.category}</p>}
        </label>

        {/* Contact Email */}
        <label className="block mb-6">
          <span className="block text-green-800 font-semibold mb-1">Contact Email</span>
          <input
            type="email"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.contactEmail ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.contactEmail && <p className="text-red-600 mt-1 text-sm">{errors.contactEmail}</p>}
        </label>

        {/* Money Required */}
        <label className="block mb-6">
          <span className="block text-green-800 font-semibold mb-1">
            Money Required by the Organization
          </span>
          <input
            type="number"
            name="moneyRequired"
            value={form.moneyRequired}
            onChange={handleChange}
            min="0"
            step="any"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.moneyRequired ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.moneyRequired && <p className="text-red-600 mt-1 text-sm">{errors.moneyRequired}</p>}
        </label>

        {/* Money Collected */}
        <label className="block mb-6">
          <span className="block text-green-800 font-semibold mb-1">Money Collected</span>
          <input
            type="number"
            name="moneyCollected"
            value={form.moneyCollected}
            onChange={handleChange}
            min="0"
            step="any"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.moneyCollected ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-400"
            }`}
          />
          {errors.moneyCollected && <p className="text-red-600 mt-1 text-sm">{errors.moneyCollected}</p>}
        </label>

        {/* Submit Error */}
        {errors.submit && <p className="text-red-700 mb-4 text-center">{errors.submit}</p>}

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
