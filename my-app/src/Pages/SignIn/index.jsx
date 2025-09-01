import { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // for navigation after login
  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!email || !password) { // check for empty fields
      alert("Fill Your Data");
      return;
    }
     // Use Supabase to log in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // if login fails, show error message
    if (error) {
      alert("Login failed: " + error.message);
    } else {
      console.log("User logged in:", data.user); //if login successful
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        {/* Email */}
        <div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        {/* Password */}
        <div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#007bff] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
