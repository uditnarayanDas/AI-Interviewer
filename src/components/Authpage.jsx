import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, Provider } from "../firebaseauthentication/config";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;
  const navigate = useNavigate();

  async function signin() {
  try {
    const result = await signInWithPopup(auth, Provider);
    const username = result.user.displayName || result.user.email || "User";
    localStorage.setItem("vocra_username", username);
    navigate("/dashboard");
  } catch (err) {
    console.error("Google sign-in failed:", err.message);
    alert("Google sign-in failed. Please try again.");
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setEmailError("");
    setPasswordError("");

    if (!isEmailValid) {
      setEmailError("Enter a valid email");
      return;
    }
    if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);

      if (error.code === "auth/user-not-found") {
        setEmailError("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email format.");
      } else {
        setEmailError("Login failed. Try again.");
        setPasswordError("");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-2 pt-20 sm:pt-12md:pt-20">
      <div className="w-full max-w-xl p-6">
        <h2 className="text-3xl font-bold text-center text-white whitespace-nowrap">
          Sign in to your account
        </h2>
        <p className="text-sm text-center text-zinc-400 mt-1">
          Not a member?
          <button
            className="text-violet-500 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 text-white">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                emailError ? "border-red-500" : "border-zinc-700"
              } text-white`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 bg-zinc-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                passwordError ? "border-red-500" : "border-zinc-700"
              } text-white`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-white">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-violet-500 text-white" />{" "}
              Remember me
            </label>
            <a href="#" className="text-violet-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-medium transition-colors ${
              isFormValid
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-zinc-700 cursor-not-allowed"
            }`}
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

        <div className="grid grid-cols-2 gap-4 text-white">
          <button
            onClick={signin}
            className="flex items-center justify-center gap-2 border border-zinc-700 rounded-md py-2 hover:bg-zinc-800"
          >
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
