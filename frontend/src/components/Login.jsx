import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });

      console.log("Login successful:", res.data);

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      navigate("/"); // Redirect after login
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-4">
          Login to Continue
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
}
