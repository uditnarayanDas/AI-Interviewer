import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  LogOut,
  User,
  Briefcase,
  Building2,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseauthentication/config";
import { signOut } from "firebase/auth";
import DashboardNavbar from "../components/DashboardNavbar";

const InterviewForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    company: "",
    resume: null,
  });

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    navigate("/dashboard/interview");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">

      <DashboardNavbar showBackButton={true} />
      
      <main className="flex justify-center py-12">
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Interview Form
            </h2>
            <p className="text-gray-400 mt-2">
              Fill in your details to start your interview journey
            </p>
          </div>

         
          <div className="mb-6">
            <label className="mb-2 font-medium flex items-center gap-2">
              <User className="w-4 h-4" /> Your Name{" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-md bg-black/20 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Experience{" "}
              <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-4 py-3 rounded-md bg-black/20 border border-white/20 text-white placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select your experience level
              </option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3+">3+ years</option>
            </select>
          </div>

          
          <div className="mb-6">
            <label className="mb-2 font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Company You Applied
            </label>
            <input
              type="text"
              placeholder="Enter company name (optional)"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full px-4 py-3 rounded-md bg-black/20 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          
          <div className="mb-6">
            <label className="mb-2 font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" /> Upload Resume{" "}
              <span className="text-red-400">*</span>
            </label>
            <div className="relative w-full border border-dashed border-white/20 rounded-md p-6 text-center cursor-pointer hover:border-blue-400/50 transition">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p className="text-sm">
                {formData.resume
                  ? formData.resume.name
                  : "Click to upload your resume"}
              </p>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>

          
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium text-white text-lg shadow-md hover:shadow-blue-600/30"
            >
              Start Interview
            </motion.button>
          </div>

          
          <p className="text-center text-gray-400 text-sm mt-6">
            Ready to showcase your skills? Let’s begin!
          </p>
        </motion.form>
      </main>
    </div>
  );
};

export default InterviewForm;
