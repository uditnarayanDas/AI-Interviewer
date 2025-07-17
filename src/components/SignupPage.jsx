import React, { useState } from "react";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../firebaseauthentication/config"; 
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid =
    confirmPassword === password && confirmPassword.length >= 6;
  const isFormValid = name && isEmailValid && isPasswordValid && isConfirmValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return setError("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
    
  };

 return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10 sm:px-10 lg:px-20">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white text-center">Create an account</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-5">
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 lg:px-6 lg:py-4 lg:text-lg text-white bg-zinc-800 border border-zinc-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 lg:px-6 lg:py-4 lg:text-lg text-white bg-zinc-800 border border-zinc-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 lg:px-6 lg:py-4 lg:text-lg text-white bg-zinc-800 border border-zinc-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-3 lg:px-6 lg:py-4 lg:text-lg text-white bg-zinc-800 border border-zinc-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 lg:py-4 lg:text-lg rounded-md text-white font-medium transition-colors bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Sign up
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span className="border-t border-zinc-700 w-1/5"></span>
          <span>or sign up with</span>
          <span className="border-t border-zinc-700 w-1/5"></span>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <button className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 lg:py-3 lg:text-lg hover:bg-zinc-800 w-full">
            <FcGoogle className="text-xl" />
            <span className="text-white">Sign up with Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 lg:py-3 lg:text-lg hover:bg-zinc-800 w-full">
            <FaGithub className="text-xl text-white" />
            <span className="text-white">Sign up with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};


