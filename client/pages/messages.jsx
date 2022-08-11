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

function PrevMessageCard({ msg }) {
  const { messages } = msg;
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}

export function Messages() {
  const { getMessages, sendMessage } = useContext(ApiContext);

  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.onmessage = (event) => {
      const { author, message } = JSON.parse(event.data);
      setChatLog((oldState) => [...oldState, { author, message }]);
    };
    setWs(ws);
  }, []);

  const [chatLog, setChatLog] = useState([]);
  const [username, setUsername] = useState("Anonymous");
  const [message, setMessage] = useState("");

  async function handleNewMessage(event) {
    event.preventDefault();
    const chatMessage = { author: username, message };
    await sendMessage(chatMessage);
    ws.send(JSON.stringify(chatMessage));
    setMessage("");
  }

  const { loading, error, data } = useLoader(async () => await getMessages());
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error, sorry</div>;
  }

  const prevMessages = data;

  return (
    <div className={"messagesContainer"}>
      <h1>Your username: {username}</h1>
      Change username:{" "}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div id={"messages"}>
        <div>
          {prevMessages.map((msg) => (
            <PrevMessageCard msg={msg} />
          ))}
        </div>
        <div>
          {chatLog.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <form onSubmit={handleNewMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button id={"button"}>Submit</button>
        </form>
      </div>
    </div>
  );
}
