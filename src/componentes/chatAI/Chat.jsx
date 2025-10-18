import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import BotonProduct from "../producto/BotonProduct";

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Obtener o generar ID de usuario
    let idUser = sessionStorage.getItem("idUser");
    if (!idUser) {
      idUser = crypto.randomUUID();
      sessionStorage.setItem("idUser", idUser);
    }

    const newMessages = { role: "user", mensaje: input, idUser: idUser };
    setMessages((prev) => [...prev, newMessages]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8080/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessages),
      });

      const respuesta = await res.json();
      setMessages((prev) => [...prev, respuesta]);

      // Detectar si la AI devolvió un producto
      const productos = ["Volante", "Tarjeta", "Folleto"];
      if (productos.includes(respuesta.mensaje)) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", mensaje: respuesta.mensaje, tipo: "producto" },
        ]);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        bgcolor: "white",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box sx={{ bgcolor: "#ffcccc", p: 2, flexShrink: 0 }}>
        <ChatHeader />
      </Box>

      {/* Body */}
      <Box sx={{ flexGrow: 1, p: 2, bgcolor: "#f0f2f5", overflowY: "auto" }}>
        <ChatBody messages={messages} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      </Box>
    </Box>
  );
}
