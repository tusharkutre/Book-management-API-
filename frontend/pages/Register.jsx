import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FormButton from "../src/components/buttons/FormButton";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    // Clear any existing messages when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending registration data:", registerData);

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // This is crucial for cookies to work
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful!");
        setMessage({ type: "success", text: data.message });

        // Reset form
        setRegisterData({
          name: "",
          email: "",
          password: "",
        });

        // Navigate to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.error("Registration failed:", data.message);
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <div className="bg-white/80 backdrop-blur shadow-md rounded-2xl border border-slate-200">
          <div className="px-6 pt-6 pb-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create your account</h1>
            <p className="text-slate-600 text-sm">Join us to continue to the app</p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="px-6 pb-6 space-y-4"
            action="/register"
            method="POST"
          >
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleInputChange}
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
                placeholder="Create a strong password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-slate-600">
                Already have an account? {" "}
                <NavLink to="/login" className="font-medium text-slate-900 hover:underline">
                  Sign in
                </NavLink>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-lg bg-slate-900 text-white font-medium px-4 py-2 shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
