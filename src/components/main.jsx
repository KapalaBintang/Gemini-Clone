import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CodeIcon from "@mui/icons-material/Code";
import CollectionsIcon from "@mui/icons-material/Collections";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/ChatContext";
import { Gemini } from "iconsax-react";
import { Skeleton } from "@mui/material";

function Main() {
  const { input, setInput, onSent, recentPrompt, resultData, loading, showResult, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  console.log(prevPrompts);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { name } = JSON.parse(storedUserData);
      setUserName(name);
    }
  }, []);

  const loadPrompt = async (prompt) => {
    setOpen((previous) => !previous);
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const isNewChatClicked = () => {
    if (!loading) newChat();
    else return;
    setOpen((previous) => !previous);
  };

  return (
    <>
      <div className="main container min-h-screen flex-1 pb-15 bg-black mx-auto relative">
        <div className="flex sm:hidden w-full justify-evenly px-5 py-5 relative nav">
          <div>
            <MenuIcon className="text-white" onClick={() => setOpen((previous) => !previous)} />
          </div>
          <h1 className="font-bold mx-auto text-xl md:text-2xl lg:text-3xl text-indigo-500 shadow-white">GEMINI</h1>
          <AccountCircleIcon className="text-white" />
        </div>

        <div className="hidden sm:flex w-full justify-between px-5 py-5 ">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-indigo-500 shadow-white">GEMINI</h1>
          <AccountCircleIcon className="text-white" />
        </div>

        <div className={`transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 fixed top-0 left-0  bg-slate-900 text-white min-h-screen z-10`}>
          <div className="flex flex-col justify-between min-h-screen">
            <div className="flex flex-wrap flex-col gap-5">
              <div className="pl-7 pt-4 mb-3 pr-6">
                <MenuIcon onClick={() => setOpen((previous) => !previous)} />
              </div>

              <div className="px-3">
                <div onClick={isNewChatClicked} className="hover:border-purple hover:opacity-75 cursor-pointer inline-flex justify-center items-center bg-indigo-700 rounded-xl px-3 py-2 text-center gap-1">
                  <AddCircleOutlineIcon />
                  <p className="text-sm">New Chat</p>
                </div>
              </div>

              <div className="pl-2 font-semibold">Recent</div>

              <div className="px-5 overflow-scroll no-scrollbar max-h-[250px]">
                {prevPrompts.map((prompt, i) => (
                  <div key={i} className="mb-2 hover:opacity-75 cursor-pointer rounded-xl" onClick={() => loadPrompt(prompt)}>
                    <div className="flex gap-2">
                      <ChatBubbleIcon />
                      <p className="mt-1 text-xs mb-2 text-ellipsis ... ">{prompt.slice(0, 8)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap flex-col gap-6 px-3 pb-7 sm:mt-32">
              <div className="flex flex-wrap items-center gap-2  cursor-pointer">
                <HistoryIcon />
                <p>History</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 cursor-pointer">
                <HelpIcon />
                <a href="https://www.instagram.com/abdul_aziz_2412/" target="_blank">
                  Help
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2 cursor-pointer">
                <SettingsIcon />
                <p>Settings</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 cursor-pointer">
                <InfoIcon />
                <a href="https://kapalabintang.github.io/Tailwind-CSS-Portofolio/#portofolio" target="_blank">
                  About me
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content mx-auto container max-w-full md:max-w-[900px] relative  text-white px-5  md:px-10 lg:px-20">
          {!showResult ? (
            <>
              <div className="mx-auto flex flex-col justify-center items-center">
                <div className="greet flex flex-col mt-10 md:mt-20 pb-6 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-transparent bg-clip-text">
                  <p className="text-3xl  md:text-5xl font-bold">{`Hello ${userName}`}</p>
                  <p className="text-3xl  md:text-5xl font-bold">How can I help you today?</p>
                </div>
                <div className="mx-auto">
                  <div className="cards w-full mx-auto justify-center items-center grid grid-rows-2 grid-cols-2 sm:grid-cols-3 md:flex lg:grid-cols-4 gap-x-9 gap-y-5 md:gap-x-3 ">
                    <div className="card mx-auto h-32 md:h-40 max-w-[8rem] md:max-w-[10rem] flex flex-col justify-between  bg-slate-700 rounded-md p-3">
                      <p className="text-sm md:text-base">Suggest beautiful places to see on a tour</p>
                      <ExploreIcon className="self-end" />
                    </div>
                    <div className="card mx-auto h-32 md:h-40  max-w-[8rem] md:max-w-[10rem] flex flex-col justify-between  bg-slate-700 rounded-md p-3">
                      <p className="text-sm md:text-base">Share a bright idea</p>
                      <EmojiObjectsIcon className="self-end" />
                    </div>
                    <div className="card mx-auto h-32 md:h-40 max-w-[8rem] md:max-w-[10rem] flex flex-col justify-between  bg-slate-700 rounded-md p-3">
                      <p className="text-sm md:text-base">Start a conversation</p>
                      <ChatBubbleIcon className="self-end" />
                    </div>
                    <div className="card h-32 md:h-40 max-w-[8rem] md:max-w-[10rem] flex flex-col justify-between  bg-slate-700 rounded-md p-3">
                      <p className="text-sm md:text-base">Code a new feature</p>
                      <CodeIcon className="self-end" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="result  max-h-[500px] md:max-h-[450px] overflow-scroll no-scrollbar flex flex-col items-end gap-4">
              <AccountCircleIcon />
              <div className="result-title flex flex-col items-end gap-2 px-3 py-3 mb-5 bg-slate-700 rounded-2xl">
                <p className="text-base font-semibold">{recentPrompt}</p>
              </div>

              <div className="result-content w-full  flex flex-col items-start">
                {loading ? (
                  <>
                    <Gemini size="30" color="#FF8A65" />
                    <div className="flex flex-col gap-2 mt-7">
                      <Skeleton variant="rectangular" className="rounded-md" width={"350px "} height={20} sx={{ bgcolor: "gray" }} />
                      <Skeleton variant="rectangular" className="rounded-md" width={"350px"} height={20} sx={{ bgcolor: "gray" }} />
                      <Skeleton variant="rectangular" className="rounded-md" width={"350px"} height={20} sx={{ bgcolor: "gray" }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {resultData.length === 0 ? null : <Gemini size="30" color="#FF8A65" />}
                      <div className="result-text text-base leading-10" dangerouslySetInnerHTML={{ __html: resultData }}></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-6 md:mt-0">
          <div className="main-bottom container w-[340px] sm:w-3/4 max-w-full md:max-w-[900px] pt-12 mx-auto absolute bottom-0 ">
            <div className="bg-slate-700 search-box max-w-full md:max-w-[800px] container mx-auto flex justify-center items-center px-5 py-3 rounded-3xl text-white">
              <div className="w-full">
                <input type="text" onChange={(e) => setInput(e.target.value)} value={input} className="w-full bg-slate-700 outline-none" placeholder="Search" />
              </div>
              <div className="text-white flex gap-3">
                <CollectionsIcon />
                <MicIcon />
                <SendIcon className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={loading ? null : () => onSent()} />
              </div>
            </div>
            <div className="footer mt-3 pb-3 ">
              <p className="text-white text-xs text-center">Gemini may display inaccurate or incomplete information.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
