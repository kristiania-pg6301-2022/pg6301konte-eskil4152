import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../tools/ApiContext";
import { useLoader } from "../tools/useLoader";
import { useNavigate } from "react-router-dom";
import React from "react";

function MessageCard({ msg }) {
  const { messages } = msg;

  console.log(messages);

  return (
    <div>
      {messages.map((msg, index) => (
        <div id={"message"} key={index}>
          <strong>{msg}</strong>
        </div>
      ))}
    </div>
  );
}

export function Messages() {
  useNavigate();
  const { getMessages } = useContext(ApiContext);
  const { sendMessage } = useContext(ApiContext);
  const [message, setMessage] = useState("");
  const [errorSend] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await sendMessage({ message });
  }

  const { loading, error, data } = useLoader(async () => await getMessages());

  const messages = data;

  if (loading) {
    return <div>Loading messages...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id={"messagesContainer"}>
      {messages.map((msg, index) => (
        <div key={index} id={"messages"}>
          <MessageCard msg={msg} />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder={"Your message"}
            />
            <button id={"button"}>Submit</button>
          </form>
        </div>
      ))}
    </div>
  );
}
