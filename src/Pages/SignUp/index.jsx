import { useState } from "react";
import { supabase } from "../../supabaseClient";

function SignUp() {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const { displayName, email, password } = formData;

    if (!displayName || !email || !password) { // check for empty fields
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName } // add custom field (display_name)
      }
    });
    setLoading(false);
    if (error) { // if signup fails, show error message
      alert(error.message);
      return;
    }
    alert("Check your email to confirm your account!");
    console.log("User signed up:", data.user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#007bff] mb-6">
          Create Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <input
        type="text"
        name="displayName"
        value={formData.displayName}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Enter your name"
      />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#007bff] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?
          <a href="/signIn" className="text-[#007bff] font-medium hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
export default SignUp;
