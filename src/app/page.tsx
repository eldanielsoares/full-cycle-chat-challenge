"use client";
import { useEffect, useState } from "react";

type Chat = {
  id: string;
  message: string;
};

export default function Home() {
  const [chatName, setChatName] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);

  const handleCreateChat = async () => {
    await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: chatName }),
    });

    getChats();
    setChatName("");
  };

  const getChats = async () => {
    const response = await fetch("http://localhost:3000/api/chat");
    const data = await response.json();
    setChats(data.messages);
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen gap-3 items-center">
      <h1 className="font-bold text-2xl">Criar chat</h1>
      <input
        type="text"
        placeholder="Digite o seu nome"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        className="max-w-80 rounded-md bg-slate-300 p-2 placeholder-slate-400 text-gray-700"
      />
      <button
        onClick={handleCreateChat}
        className="w-fit p-3 rounded-md bg-blue-950 text-white font-bold "
      >
        Criar Chat
      </button>
      {chats?.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center gap-2 border border-solid border-blue-500 rounded-md w-80 p-3"
        >
          <p>{chat.message}</p>
        </div>
      ))}
    </div>
  );
}
