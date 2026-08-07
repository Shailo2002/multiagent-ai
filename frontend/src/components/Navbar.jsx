import React from "react";
import { BrandLogoWithName } from "./BrandLogo";

function Navbar() {
  return (
    <div className="flex w-full max-w-4xl items-center justify-between p-6">
      <BrandLogoWithName />

      <div className="flex items-center justify-center gap-8">
        <div>feture 1</div>
        <div>feature 2</div>
        <div>pricing</div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button className="bg-accent hover:bg-accent-hover font-grotesk rounded-lg px-2 py-2 text-[13px] tracking-tight text-black">
          Sign In
        </button>
        <button className="font-grotesk rounded-lg bg-white px-2 py-2 text-sm text-[13px] tracking-tight text-black hover:bg-slate-100">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
