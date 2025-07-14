import { motion } from "framer-motion";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video1.mp4";
import { Second } from "./Second";
import Magnet from "../components/Magnet";
import Radio, { RadioGroup } from "../components/Radio";
import { useState } from "react";
import { BadgePercent, Sparkle, Gem, Crown, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [plan, setPlan] = useState("");
  const navigate = useNavigate();


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col items-center px-2 -mt-10 sm:-mt-5 md:mt-0"
    >
      <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl text-center tracking-wide leading-snug">
        Mock Today
        <span className="block sm:inline bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          Hire Tomorrow
        </span>
      </h1>

      <p className="mt-1 sm:mt-2 text-base sm:text-lg text-center text-neutral-600 max-w-lg sm:max-w-2xl">
        Vocra simulates real interview scenarios using AI — ask, answer, and
        improve your performance like you're in the room.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-8">
        <Magnet
          padding={200}
          magnetStrength={3}
          wrapperClassName=""
          innerClassName="inline-block"
        >
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:shadow-[0_0_20px_6px_rgba(255,255,255,0.4)] transition"
            onClick={() => navigate("/login")}>
            Get Started
          </button>
        </Magnet>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-10 mt-10 w-full">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-full sm:w-1/2 border border-white-20  shadow-[0_0_20px_6px_rgba(255,255,255,0.2)] mb-6 sm:mb-0"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-full sm:w-1/2 border border-white-20 shadow-[0_0_20px_6px_rgba(255,255,255,0.2)]"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div id="features" className="w-full mt-24 px-4 pt-20">
        <Second />
      </div>
      <section id="pricing" className="mt-20 mb-10 w-full flex flex-col items-center px-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white text-center">
          Choose Your Plan
        </h2>
        <hr className="my-2 sm:my-3 w-40 sm:w-56 border-neutral-700" />

        <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
          <div className="flex flex-col gap-3 sm:gap-4 justify-center w-full max-w-xs sm:max-w-xl">
            <Radio value="mobile">
              <Plan
                icon={<BadgePercent />}
                title="Mobile"
                features={["Mobile", "Ads"]}
                price={0}
              />
            </Radio>
            <Radio value="basic">
              <Plan
                icon={<Sparkle />}
                title="Basic"
                features={["HD(720p)", "1 Device"]}
                price={0}
              />
            </Radio>
            <Radio value="standard">
              <Plan
                icon={<Gem />}
                title="Standard"
                features={["HD(1080p)", "2 Devices"]}
                price={499}
              />
            </Radio>
            <Radio value="premium">
              <Plan
                icon={<Crown />}
                title="Premium"
                features={["Ultra HD (4k) + HDR", "4 Devices"]}
                price={649}
              />
            </Radio>
          </div>
        </RadioGroup>

        <hr className="my-2 sm:my-3 w-40 sm:w-56 border-neutral-700" />

        <button className="flex gap-3 items-center px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-violet-800 hover:bg-violet-700 font-semibold shadow-[0_0_20px_6px_rgba(139,92,246,0.7)] text-sm sm:text-lg text-white mt-4">
          Proceed with {plan || "your"} plan
          <ArrowRight />
        </button>
      </section>
      <Footer />
    </motion.div>
  );
};

function Plan({ icon, title, features, price }) {
  return (
    <div className="flex gap-5 items-center">
      {icon}
      <div>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-black">{features.join(" · ")}</p>
      </div>
      <span className="ml-auto font-medium text-black">₹{price}</span>
    </div>
  );
}

export default Home;
