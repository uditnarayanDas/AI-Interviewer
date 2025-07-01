import React, { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = confirmPassword === password && confirmPassword.length >= 6;
  const isFormValid = name && isEmailValid && isPasswordValid && isConfirmValid;

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

    if (!isConfirmValid) {
      setConfirmError("Passwords do not match");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (valid) {
      // Handle signup logic here
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-start justify-center pt-0 px-4">
      <div className="w-full max-w-xl p-8">
        <h2 className="text-3xl font-bold text-center text-white">Create a new account</h2>

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
            <label className="block text-sm mb-1 text-white">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${emailError ? 'border-red-500' : 'border-zinc-700'}`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Create Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${passwordError ? 'border-red-500' : 'border-zinc-700'}`}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${confirmError ? 'border-red-500' : 'border-zinc-700'}`}
            />
            {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-medium transition-colors ${isFormValid ? 'bg-violet-600 hover:bg-violet-700' : 'bg-zinc-700 cursor-not-allowed'}`}
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
