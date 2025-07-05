import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, LogOut, User, Briefcase, Building2, FileText } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Interviewform = () => {
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    company: '',
    resume: null 
  });

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Glass Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            VOCRA
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-4">
              Interview Form
            </h1>
            <p className="text-gray-400 text-lg">Fill in your details to start your interview journey</p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name" className="text-white flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4" />
                  Your Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-12"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Experience Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="experience" className="text-white flex items-center gap-2 text-sm font-medium">
                  <Briefcase className="w-4 h-4" />
                  Experience <span className="text-red-400">*</span>
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="0-1" className="hover:bg-gray-700">0-1 years</SelectItem>
                    <SelectItem value="1-3" className="hover:bg-gray-700">1-3 years</SelectItem>
                    <SelectItem value="3+" className="hover:bg-gray-700">3+ years</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Company Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="company" className="text-white flex items-center gap-2 text-sm font-medium">
                  <Building2 className="w-4 h-4" />
                  Company You Applied
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-12"
                  placeholder="Enter company name (optional)"
                />
              </motion.div>

              {/* Resume Upload */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="resume" className="text-white flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  Upload Resume <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-400/50 transition-all duration-300"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-300 mb-1">
                      {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                    </p>
                    <p className="text-gray-500 text-sm">PDF, DOC, DOCX up to 10MB</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-lg"
                >
                  Start Interview
                </motion.button>
              </motion.div>
            </div>
          </motion.form>

          {/* Footer Animation */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8 text-gray-400"
          >
            <p>Ready to showcase your skills? Let's begin!</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Interviewform;
