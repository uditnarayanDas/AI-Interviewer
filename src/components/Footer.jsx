import { motion } from "framer-motion";
import { Github, Twitter, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full bg-white/5 backdrop-blur-md text-white py-10 px-6 mt-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold tracking-wide">Vocra</h2>
          <p className="text-sm text-white/60 mt-2">
            Simulating interviews. Shaping futures.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium ">
          <HoverLink>Home</HoverLink>
          <HoverLink>Features</HoverLink>
          <HoverLink>Pricing</HoverLink>
          <HoverLink>About</HoverLink>
        </div>

        {/* Right Socials */}
        <div className="flex gap-6 justify-center ">
          <HoverIcon>
            <Twitter />
          </HoverIcon>
          <HoverIcon>
            <Linkedin />
          </HoverIcon>
          <HoverIcon>
            <Github />
          </HoverIcon>
          <HoverIcon>
            <Mail />
          </HoverIcon>
        </div>
      </div>

      <p className="text-center text-white/40 text-xs mt-10">
        © {new Date().getFullYear()} Vocra. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;

// Reusable animated link
const HoverLink = ({ children }) => (
  <motion.a
    whileHover={{ scale: 1.05, color: "#a855f7" }}
    className="cursor-pointer transition duration-300 text-white/70 hover:text-violet-400"
  >
    {children}
  </motion.a>
);

// Reusable social icon
const HoverIcon = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    className="cursor-pointer p-2 rounded-full bg-white/10 hover:bg-violet-600 transition"
  >
    {children}
  </motion.div>
);
