import React, { useEffect, useRef } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      {message.tipo === "producto" ? (
        <Button
          variant="contained"
          onClick={() => {
            // Construir la URL dinámicamente
            const url = `/productos/${message.mensaje.toLowerCase()}`;
            window.location.href = url;
          }}
        >
          Click aqui para completar datos / 点击这里填写信息
        </Button>
      ) : (
        <Paper
          sx={{
            p: 1.5,
            bgcolor: isUser ? "#DCF8C6" : "#ffffff",
            maxWidth: "75%",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            borderRadius: 2,
            wordBreak: "break-word",
          }}
        >
          <Typography variant="body2">{message.mensaje}</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default function ChatBody({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {messages.map((msg, i) => (
        <Message
          key={i}
          message={msg}
        />
      ))}
      <div ref={bottomRef} />
    </Box>
  );
}
