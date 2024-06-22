import Sidebar from "../components/Sidebar";
import Main from "../components/main";

const ChatSlice = () => {
  return (
    <>
      <div className="flex p-0 m-0 font-sans ">
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export default ChatSlice;
