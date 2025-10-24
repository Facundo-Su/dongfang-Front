import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, CircularProgress, Fade } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import BotonProduct from "../producto/BotonProduct";

export default function Chat() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Guardar mensajes en sesión
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll hacia el final
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    let idUser = sessionStorage.getItem("idUser");
    if (!idUser) {
      idUser = crypto.randomUUID();
      sessionStorage.setItem("idUser", idUser);
    }

    const userMessage = { role: "user", mensaje: input, idUser };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });

      const respuesta = await res.json();
      // Si la respuesta es un producto, mostrar el botón visualmente
      const productos = ["Volante", "Tarjeta", "Folleto", "Etiqueta"];
      if (productos.includes(respuesta.mensaje)) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            mensaje: respuesta.mensaje,
            tipo: "producto",
          },
        ]);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%)",
      }}
    >
      {/* Header */}
      <Box sx={{ bgcolor: "#ffcccc", p: 2, flexShrink: 0 }}>
        <ChatHeader />
      </Box>

      {/* Body */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: "#f0f2f5",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatBody messages={messages} />

        {/* Estado "escribiendo..." */}
        {loading && (
          <Fade in={loading}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
              <CircularProgress
                size={18}
                sx={{ mr: 1 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                El asistente está escribiendo...
              </Typography>
            </Box>
          </Fade>
        )}

        <div ref={chatEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "#fff",
        }}
      >
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          disabled={loading}
        />
      </Box>
    </Box>
  );
}
