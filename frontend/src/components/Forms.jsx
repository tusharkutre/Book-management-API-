import React from "react";
import { useState } from "react";
import { useNavigate , NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormButton from "./buttons/FormButton";

const Forms = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState();

  // send form data via req.body to the backend
  const [formData, setFormData] = useState({
    email: "", //updated input value for this state
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // This is crucial for cookies to work
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful!");

        const successMessage = { type: "success", text: `✅ Welcome, ${data.user.name}!` };
        setMessage(successMessage);
        // Refresh auth state so ProtectedRoute allows access, then navigate
        await login();
        navigate("/books", { replace: true, state: { message: successMessage } });
      } else {
        console.error("Login failed:", data.message);
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
        {/* success/error flash messages from backend */}
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
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
            <p className="text-slate-600 text-sm">Sign in to continue to your account</p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="px-6 pb-6 space-y-4"
            action="/login"
            method="POST"
          >
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                name="password"
                value={formData.password}
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-slate-600">
                New here? {" "}
                <NavLink to="/register" className="font-medium text-slate-900 hover:underline">
                  Create an account
                </NavLink>
              </div>
            </div>

            <div className="pt-2">
              <FormButton name={"Sign In"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;