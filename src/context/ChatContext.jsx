import { createContext, useEffect, useState } from "react";
import run from "../config/ChatApi";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState(localStorage.getItem("prevPrompts") ? JSON.parse(localStorage.getItem("prevPrompts")) : []);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Save prevPrompts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
  };

  const delayedFunc = (i, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * i);
  };

  const onSent = async (prompt) => {
    const trimmedInput = prompt !== undefined ? prompt.trim() : input.trim();

    if (!trimmedInput) {
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
      response = await run(prompt);
    } else {
      setRecentPrompt(input);
      setPrevPrompts((prevPrompts) => [...prevPrompts, input]);
      response = await run(input);
    }

    let responseArr = response.split("**");
    console.log(responseArr);
    let newResponse = "";
    for (let i = 0; i < responseArr.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArr[i];
      } else {
        newResponse += `<b class="text-indigo-500">${responseArr[i]}</b>`;
      }
    }
    const newResponse2 = newResponse.split("*").join("</br>");
    const words = newResponse2.split(" ");
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      delayedFunc(i, word + " ");
    }
    setLoading(false);
    setInput("");
  };

  const chatContext = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return <Context.Provider value={chatContext}>{props.children}</Context.Provider>;
};

export default ContextProvider;
