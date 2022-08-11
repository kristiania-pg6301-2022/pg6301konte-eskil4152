import { useContext, useEffect, useState } from "react";
import React from "react";
import { ApiContext } from "../tools/ApiContext";
import { fetchJSON } from "../tools/fetchJSON";
import { useLoader } from "../tools/useLoader";

function ChatMessage({ chat: { author, message } }) {
  return (
    <div>
      <strong>{author}: </strong>
      {message}
    </div>
  );
}

export function Messages() {
  const { getMessages, sendMessage, getUser } = useContext(ApiContext);

  const username = "Ole";

  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.onmessage = (event) => {
      const { author, message } = JSON.parse(event.data);
      setChatLog((oldState) => [...oldState, { author, message }]);
    };
    setWs(ws);
  }, []);

  const { loading, error, data } = useLoader(async () => await getMessages());

  console.log(data);

  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");

  async function handleNewMessage(event) {
    event.preventDefault();
    const chatMessage = { author: username, message };
    await sendMessage(chatMessage);
    ws.send(JSON.stringify(chatMessage));
    setMessage("");
  }

  return (
    <div className={"messagesContainer"}>
      <div id={"messages"}>
        {chatLog.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </div>
      <form onSubmit={handleNewMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button id={"button"}>Submit</button>
      </form>
    </div>
  );
}
