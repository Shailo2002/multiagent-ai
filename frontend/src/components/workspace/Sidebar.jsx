import { useState } from "react";
import { BrandLogo, BrandLogoWithName } from "../BrandLogo";
import { GoSidebarExpand } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { chats, sidebarButtons } from "../../constants/sidebarConst.js";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";

function Sidebar({ userData }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(true);
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

  function toggleSidebar() {
    setIsExpanded((currentValue) => !currentValue);
  }

  function toggleChatHistory() {
    setIsChatHistoryOpen((isChatHistoryOpen) => !isChatHistoryOpen);
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 240 : 52 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="border-r-0.5 bg-surface-raised hidden h-screen shrink-0 flex-col overflow-hidden border-white/20 p-1 sm:flex"
    >
      <header
        style={{
          justifyContent: isExpanded ? "space-between" : "center",
        }}
        className="flex items-center py-4"
      >
        {isExpanded && (
          <div className="inline-flex min-w-0 overflow-hidden">
            <BrandLogoWithName />
          </div>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          className="rounded-control text-text-soft hover:bg-surface-hover hover:text-text inline-flex size-10 shrink-0 items-center justify-center transition-colors"
        >
          <span className="inline-flex">
            <TbLayoutSidebarLeftCollapse size={22} />
          </span>
        </button>
      </header>

      <nav className="flex flex-col gap-0">
        {sidebarButtons.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              type="button"
              aria-label={option.label}
              title={!isExpanded ? option.label : undefined}
              className="rounded-control text-text-soft hover:bg-surface-hover hover:text-text flex h-10 w-full items-center overflow-hidden px-3 text-sm transition-colors"
            >
              <span className="flex w-5 shrink-0 items-center justify-center">
                <Icon size={20} />
              </span>

              <motion.span
                initial={false}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? "auto" : 0,
                  marginLeft: isExpanded ? 12 : 0,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeInOut",
                }}
                className="block overflow-hidden whitespace-nowrap"
              >
                {option.label}
              </motion.span>
            </button>
          );
        })}
      </nav>

      <section className="flex h-full min-h-0 flex-1 flex-col py-2">
        <div
          className={`flex h-10 shrink-0 items-center ${
            isExpanded ? "justify-between px-3" : "justify-center"
          }`}
        >
          {isExpanded && (
            <button
              type="button"
              aria-expanded={isChatHistoryOpen}
              className="text-text-soft hover:text-text flex items-center gap-1 text-sm font-medium transition-colors"
              onClick={toggleChatHistory}
            >
              <span>Chats</span>

              <span className="inline-flex">
                <IoIosArrowDown size={16} />
              </span>
            </button>
          )}

          <button
            type="button"
            aria-label="Create new chat"
            title="Create new chat"
            className={`rounded-control text-text-soft hover:bg-surface-hover hover:text-text flex shrink-0 items-center justify-center transition-colors ${
              isExpanded ? "size-8" : "size-10"
            }`}
          >
            <FaPlus size={16} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && isChatHistoryOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="min-h-0 overflow-hidden"
            >
              <div className="flex max-h-full flex-col gap-0.5 overflow-y-auto pr-1">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    type="button"
                    className="rounded-control text-text-soft hover:bg-surface-hover hover:text-text w-full truncate px-3 py-2 text-left text-sm transition-colors"
                  >
                    {chat.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer
        className={`border-secondary flex h-12 shrink-0 items-center justify-between border-t px-1.5`}
      >
        <div className="flex min-w-0 items-center ">
          <button
            type="button"
            aria-label="Open user profile"
            className="shrink-0 rounded-full"
          >
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt={userData?.name ?? "User"}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <HiMiniUserCircle className="text-text-soft size-8" />
            )}
          </button>

          <motion.span
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              width: isExpanded ? "auto" : 0,
              marginLeft: isExpanded ? 12 : 0,
            }}
            transition={{
              duration: 0.18,
              ease: "easeInOut",
            }}
            className="text-text max-w-28 truncate text-sm"
          >
            {userData?.name ?? "User"}
          </motion.span>
        </div>
        <motion.button
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            marginLeft: isExpanded ? 12 : 0,
          }}
          transition={{
            duration: 0.18,
            ease: "easeInOut",
          }}
          type="button"
          aria-label="Log out"
          title="Log out"
          className="rounded-control text-text-soft hover:bg-surface-hover hover:text-danger flex size-9 shrink-0 items-center justify-center transition-colors"
        >
          <FiLogOut size={19} />
        </motion.button>
      </footer>
    </motion.aside>
  );
}

export default Sidebar;
