import React, { useEffect, useState } from "react";

// Define a type for the message
type Message = {
  text: string;
  // Add more fields as needed
};

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket("wss://your-websocket-server.com");

    webSocket.onopen = function (event) {
      console.log("Connection opened", event);
    };

    webSocket.onmessage = function (event) {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    webSocket.onerror = function (event) {
      console.error("WebSocket error observed:", event);
    };

    webSocket.onclose = function (event) {
      console.log("WebSocket connection closed:", event);
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);

  const sendMessage = (message: Message) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage({ text: "Hello WebSocket!" })}>
        Send Message
      </button>
    </div>
  );
};

export default ChatComponent;
