import React, { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!isEmailValid) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      // Handle login logic here
    }
  };

  return (
    <div className="h-screen overflow-hidden text-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-zinc-900 p-8 rounded-xl shadow-xl overflow-hidden">
        {/* Sign In Section */}
        <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
        <p className="text-sm text-center mt-1">
          Not a member? <button className="text-violet-500 hover:underline">Sign up</button>
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 bg-zinc-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${emailError ? 'border-red-500' : 'border-zinc-700'}`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 bg-zinc-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${passwordError ? 'border-red-500' : 'border-zinc-700'}`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-violet-500" /> Remember me
            </label>
            <a href="#" className="text-violet-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-medium transition-colors ${isFormValid ? 'bg-violet-600 hover:bg-violet-700' : 'bg-zinc-700 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-zinc-700"></div>
          <span className="px-4 text-sm text-zinc-400">Or continue with</span>
          <div className="flex-grow h-px bg-zinc-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 hover:bg-zinc-800">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 hover:bg-zinc-800">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-5 h-5" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}