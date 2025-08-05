import React, { useState } from "react";
import { motion } from "framer-motion";

export default function VocraApplication() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    experience: "",
    company: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log(form);
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 mb-10">
        <h1 className="text-2xl font-bold tracking-wide">VOCRA</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Application Form</h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1">Name *</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 focus:outline-none"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-1">Designation *</label>
            <input
              type="text"
              name="designation"
              required
              value={form.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 focus:outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-1">Work Experience *</label>
            <select
              name="experience"
              required
              value={form.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 focus:outline-none"
            >
              <option value="">Select experience</option>
              <option value="0">Fresher</option>
              <option value="0-2">Intermediate (0-2 years)</option>
              <option value="2+">Experienced (2+ years)</option>
            </select>
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-1">Company Name *</label>
            <input
              type="text"
              name="company"
              required
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 focus:outline-none"
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block mb-1">Upload CV *</label>
            <input
              type="file"
              name="cv"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-lg bg-black/30 border border-white/10 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mt-4 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition"
          >
            Start Interview
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
