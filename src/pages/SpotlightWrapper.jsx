import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";


const SpotlightWrapper = ({ children, className = "", ...props }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;
      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
    };

    const currentBtn = btnRef.current;
    currentBtn.addEventListener("mousemove", handleMouseMove);
    currentBtn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentBtn.removeEventListener("mousemove", handleMouseMove);
      currentBtn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      ref={btnRef}
      whileTap={{ scale: 0.985 }}
      className={`relative overflow-hidden rounded-md px-4 py-3 text-lg font-medium text-white border-zinc-700 ${className}`}
      {...props}
    >
      
      <span className="pointer-events-none relative z-10 mix-blend-difference">{children}</span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
      />
    </motion.button>
  );
};

export default SpotlightWrapper;
