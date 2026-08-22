import { useEffect, useState } from "react";
import { BrandLogo, BrandLogoWithName } from "../BrandLogo";
import { GoSidebarExpand } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import {
  profileMenuButtons,
  sidebarButtons,
} from "../../constants/sidebarConst.js";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import logoutUser from "../../features/logout";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/userSlice";
import getChat from "../../features/getChat";
import { setChatsData } from "../../redux/chatsSlice";

function Sidebar({ userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatsData = useSelector((state) => state.chats.chatsData);
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

  useEffect(() => {
    const handleGetChats = async () => {
      try {
        const response = await getChat();
        dispatch(setChatsData(response?.data));
      } catch (error) {
        console.log("error while getting chats : ", error);
      }
    };

    handleGetChats();
  }, [userData]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 240 : 52 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="border-r-0.5 bg-surface-raised hidden h-screen shrink-0 flex-col overflow-visible border-white/20 p-1 sm:flex"
    >
      <header
        style={{
          justifyContent: isExpanded ? "space-between" : "center",
        }}
        className="flex items-center py-4"
      >
        {isExpanded && (
          <div
            className="inline-flex min-w-0 cursor-pointer overflow-hidden"
            onClick={() => navigate("/")}
          >
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
              onClick={option?.onClick}
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
                {chatsData?.map((chat) => (
                  <button
                    key={chat._id}
                    type="button"
                    onClick={() => navigate(`/chat/${chat._id}`)}
                    className="rounded-control text-text-soft hover:bg-surface-hover hover:text-text w-full truncate px-3 py-2 text-left text-sm transition-colors"
                  >
                    {chat.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer
        className={`border-secondary relative flex h-12 shrink-0 items-center justify-between border-t px-1.5`}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        onFocus={openMenu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            closeMenu();
          }
        }}
        onClick={toggleMenu}
      >
        <div className="flex min-w-0 items-center">
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
          onClick={() => {
            logoutUser();
            dispatch(clearUserData());
            navigate("/");
          }}
          type="button"
          aria-label="Log out"
          title="Log out"
          className="rounded-control text-text-soft hover:bg-surface-hover hover:text-danger flex size-9 shrink-0 items-center justify-center transition-colors"
        >
          <FiLogOut size={19} />
        </motion.button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.97,
              }}
              transition={{
                duration: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`bg-popup absolute bottom-full left-0 z-50 mb-2 ml-1 origin-bottom-left overflow-hidden rounded-xl border border-white/10 shadow-[0_16px_40px_rgb(0_0_0/0.55),0_4px_12px_rgb(0_0_0/0.35)] ring-1 ring-black/20 ${isExpanded ? "w-56" : "w-42"} `}
            >
              <div className="flex max-h-full flex-col gap-0.5 overflow-y-auto p-1">
                {profileMenuButtons.map((profile) => {
                  const Icon = profile.icon;

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      aria-label={profile.label}
                      className="text-text-soft hover:bg-popup-hover hover:text-text flex h-10 w-full items-center gap-2 overflow-hidden rounded-lg px-3 text-sm transition-colors duration-150"
                    >
                      <span className="flex w-5 shrink-0 items-center justify-center">
                        <Icon size={20} />
                      </span>

                      <span className="truncate whitespace-nowrap">
                        {profile.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </motion.aside>
  );
}

export default Sidebar;
