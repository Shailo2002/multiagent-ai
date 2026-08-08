import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaPlus } from "react-icons/fa6";

function FeatureChips({ features }) {
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen((currentValue) => !currentValue);
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
    >
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-zinc-800"
      >
        <span>Features</span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          <FaPlus className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.98,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="absolute top-full z-50 w-57 pt-2"
          >
            <div className="bg-canvas divide-y divide-zinc-800 overflow-hidden rounded-lg border border-zinc-800 shadow-lg">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  role="menuitem"
                  className="flex w-full flex-5 items-center justify-center p-3 text-left transition-colors hover:bg-zinc-800"
                >
                  <feature.icon size={24} className="flex-1" />
                  <div className="flex-4">
                    <p className="text-sm font-medium text-zinc-100">
                      {feature.label}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FeatureChips;
