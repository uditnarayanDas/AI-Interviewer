
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const Navbar = ({ onLoginClick }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <div className="sticky top-0 z-50 flex justify-center py-4">
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="relative mx-auto flex w-fit rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-lg gap-x-2 md:gap-x-4"
      >
        <Tab setPosition={setPosition}>Home</Tab>
        <Tab setPosition={setPosition} scrollTo="features">Features</Tab>
        <Tab setPosition={setPosition} scrollTo="pricing" >Pricing</Tab>
        <Tab setPosition={setPosition}>Login</Tab>
        <Tab setPosition={setPosition}>Signup</Tab>

        <Cursor position={position} />
      </ul>
    </div>
  );
};

const Tab = ({ children, setPosition, scrollTo}) => {
  const ref = useRef(null);
  const isLogin = children === "Login";
  const isSignup = children === "Signup";
  const navigate = useNavigate();

  const handleClick = () => {
    // Smooth scroll when matching section
    if (children === "Home") {
      navigate("/");
    }else if (children === "Features" || children === "Pricing") {
      const id = children.toLowerCase(); // 'features' or 'pricing'
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }else if (children === "Login") {
      navigate("/login");
    }
  };

  return (
    <li
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer rounded-full px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base transition-all
        ${
          isSignup
            ? "bg-white/70 text-black hover:bg-white/90 shadow-sm hover:shadow-[0_0_20px_6px_rgba(255,255,255,0.6)]"
            : isLogin
            ? "border-[1px] border-white/20 text-white hover:bg-white/5 px-2.5 transition-all"
            : "text-white mix-blend-difference"
        }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{ ...position }}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      className="absolute z-0 h-7 rounded-full md:h-12"
    />
  );
};

export default Navbar;