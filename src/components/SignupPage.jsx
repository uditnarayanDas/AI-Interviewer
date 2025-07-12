import React, { useState } from "react";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../firebaseauthentication/config"; 
import { useNavigate } from "react-router-dom";

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
    // Remove the duplicate block below, as the async/await block above already handles signup.
    // If you want to keep the .then/.catch style, remove the async/await block above.
    // if (valid) {
    //   createUserWithEmailAndPassword(auth, email, password)
    //     .then(() => {
    //       alert("Account created successfully!");
    //       navigate("/login");
    //     })
    //     .catch((error) => {
    //       console.error("Signup error:", error.message);

    //       // Optional: Show user-friendly errors
    //       if (error.code === "auth/email-already-in-use") {
    //         setEmailError("Email already in use");
    //       } else {
    //         alert("Signup failed. Please try again.");
    //       }
    //     });
    // }
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-2 pt-0 sm:pt-12md:pt-20">
      <div className="w-full max-w-xl p-6">
        <h2 className="text-3xl font-bold text-center text-white">
          CREATE AN ACCOUNT
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 text-white">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                emailError ? "border-red-500" : "border-zinc-700"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">
              Create Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                passwordError ? "border-red-500" : "border-zinc-700"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                confirmError ? "border-red-500" : "border-zinc-700"
              }`}
            />
            {confirmError && (
              <p className="text-red-500 text-sm mt-1">{confirmError}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-medium transition-colors ${
              isFormValid
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-zinc-700 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Sign up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-zinc-700"></div>
          <span className="px-4 text-sm text-zinc-400">Or continue with</span>
          <div className="flex-grow h-px bg-zinc-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-white">
          <button className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 hover:bg-zinc-800">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 hover:bg-zinc-800">
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
