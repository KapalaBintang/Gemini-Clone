import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil data pengguna dari local storage
    const savedUserData = JSON.parse(localStorage.getItem("userData"));

    if (savedUserData) {
      if (savedUserData.email === email && savedUserData.password === password) {
        console.log("Login successful");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/chat");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No user registered with this email");
    }

    // Reset form
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-indigo-700 hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-700 text-sm">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
