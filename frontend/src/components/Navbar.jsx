import React from "react";
import { BrandLogoWithName } from "./BrandLogo";
import { defaultFeatures } from "./landigPage/featureMenu.data";
import FeatureChips from "./landigPage/FeatureChips";
import { MdOutlineAttachMoney } from "react-icons/md";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleGotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-center">
      <div className="flex h-16 w-full max-w-3xl items-center justify-between">
        <BrandLogoWithName />

        <div className="hidden items-center justify-center gap-2 text-zinc-400 transition-all duration-200 ease-out hover:scale-[1.02] sm:flex">
          <FeatureChips features={defaultFeatures} />
          <motion.div
            whileHover="hover"
            initial="initial"
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-zinc-800"
          >
            <span>Pricing</span>

            <motion.span
              variants={{
                initial: { rotate: 0 },
                hover: { rotate: 180 },
              }}
              transition={{
                duration: 0.18,
                ease: "easeInOut",
              }}
              className="inline-flex"
            >
              <MdOutlineAttachMoney className="size-5" />
            </motion.span>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-accent hover:bg-accent-hover font-grotesk rounded-lg px-2 py-2 text-[13px] tracking-tight text-black"
            onClick={handleGotoLogin}
          >
            Sign In
          </button>
          <button
            className="font-grotesk rounded-lg bg-white px-2 py-2 text-sm text-[13px] tracking-tight text-black hover:bg-slate-100"
            onClick={handleGotoLogin}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
