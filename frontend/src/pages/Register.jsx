import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      console.log(res);

      toast.success("Account created successfully! Please log in to continue.");
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create your account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Thousands of creators using AI
        </p>
        
      
        {/* Username */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Username</label>

          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-purple-500">
            <i className="ri-user-line text-gray-400"></i>

            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              placeholder="John Doe"
              className="w-full p-2 outline-none"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>

          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-purple-500">
            <i className="ri-mail-line text-gray-400"></i>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="john@example.com"
              className="w-full p-2 outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>

          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-purple-500">
            <i className="ri-lock-line text-gray-400"></i>

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="********"
              className="w-full p-2 outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>

    </div>
  );
};

export default Register;