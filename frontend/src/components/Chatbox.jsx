import React from "react";
import { defaultFeatures } from "./landigPage/featureMenu.data";

function Chatbox() {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="flex max-w-3xl flex-col items-center justify-center p-6 pb-[8%]">
        <div className="rounded-full border border-orange-400 bg-orange-200 px-4 py-1 text-orange-600">
          🧡 Loved by customers
        </div>
        <div className="font-grotesk mt-6 text-4xl">
          Build, Run & Grow your business
        </div>
        <textarea className="border-secondary rounded-card m-4 h-36 w-3xl border bg-zinc-800 p-2">
          Type your ideas here...
        </textarea>
        <div className="scrollbar-width:none flex max-w-3xl gap-2 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          {defaultFeatures.map((feature) => (
            <button
              key={feature.id}
              className="border-secondary inline-flex shrink-0 items-center gap-2 rounded-full border px-2 py-1"
            >
              <feature.icon />
              {feature.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
