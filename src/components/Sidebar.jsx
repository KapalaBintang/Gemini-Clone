import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import HelpIcon from "@mui/icons-material/Help";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useContext } from "react";
import { Context } from "../context/ChatContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { prevPrompts, setRecentPrompt, onSent, loading, newChat } = useContext(Context);
  const [open, setOpen] = useState(false);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`transform transition-transform min-h-screen sm:flex flex-col justify-between pr-2 bg-slate-950 text-white border-r-2 duration-300 ${open ? "block" : "hidden"}`}>
      <div className="flex flex-wrap flex-col gap-5">
        <div className="pl-7 pt-4 mb-3 pr-6">
          <MenuIcon onClick={() => setOpen((previous) => !previous)} />
        </div>

        {!open && (
          <div className="px-4">
            <div className="hover:border-purple bg-indigo-700 hover:opacity-75 cursor-pointer inline-flex justify-center items-center bg-gray rounded-xl px-3 py-2 text-center gap-1">
              <AddCircleOutlineIcon />
            </div>
          </div>
        )}

        {open && (
          <div className="px-4">
            <div onClick={!loading ? () => newChat() : null} className="hover:border-purple hover:opacity-75 cursor-pointer inline-flex justify-center items-center bg-indigo-700 rounded-xl px-3 py-2 text-center gap-1">
              <AddCircleOutlineIcon />
              <p className="text-sm">New Chat</p>
            </div>
          </div>
        )}

        {open && <div className="pl-2 font-semibold">Recent</div>}

        {open && (
          <div className="px-7 overflow-scroll no-scrollbar max-h-[280px]">
            {prevPrompts.map((prompt, i) => (
              <div key={i} className="mb-2 hover:opacity-75 cursor-pointer rounded-xl" onClick={() => loadPrompt(prompt)}>
                <div className="flex gap-2">
                  <ChatBubbleIcon />
                  <p className="mt-1 text-xs mb-2 text-ellipsis ... ">{prompt.slice(0, 14)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!open && (
        <div className="flex flex-wrap flex-col gap-6 px-7 pb-7">
          <div className="flex flex-wrap items-center gap-2">
            <HistoryIcon />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <HelpIcon />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SettingsIcon />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <InfoIcon />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <LogoutIcon />
          </div>
        </div>
      )}
      {open && (
        <div className="flex flex-wrap flex-col gap-6 px-7 pb-7">
          <div className="flex flex-wrap items-center gap-2">
            <HistoryIcon />
            <p>History</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <HelpIcon />
            <a href="https://www.instagram.com/abdul_aziz_2412/" target="_blank">
              Help
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SettingsIcon />
            <p>Settings</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 cursor-pointer">
            <InfoIcon />
            <a href="https://kapalabintang.github.io/Tailwind-CSS-Portofolio/#portofolio" target="_blank">
              About me
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 cursor-pointer">
            <>
              <LogoutIcon />
              <Link to={"/login"}>Logout</Link>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
