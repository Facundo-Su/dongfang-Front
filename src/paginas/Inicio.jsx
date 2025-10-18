import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../componentes/navbar/Sidebar";
import Chat from "../componentes/chatAI/Chat";

export default function Inicio() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#f0f2f5", // fondo general
        p: 2, // padding general
        gap: 2, // separación entre sidebar y chat
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: 260 },
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Box>

      {/* Contenedor del chat */}
      <Box
        sx={{
          flexGrow: 1, // ocupa todo el espacio restante
          display: "flex",
          justifyContent: "center", // centra horizontalmente
          alignItems: "stretch", // ocupa todo el alto
          bgcolor: "#e8ebf0", // fondo del área del chat
          p: 2, // margen interno
          height: "100%", // altura completa en md y auto en xs
        }}
      >
        <Box
          sx={{
            flexGrow: 1, // ocupa todo el espacio disponible
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            border: "1px solid #ccc",
            boxShadow: "0px 8px 20px rgba(197, 24, 24, 0.15)",
            overflow: "hidden",
            minWidth: 300, // ancho mínimo
          }}
        >
          <Chat />
        </Box>
      </Box>
    </Box>
  );
}
