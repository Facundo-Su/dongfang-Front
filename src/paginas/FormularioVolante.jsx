import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Sidebar from "../componentes/navbar/Sidebar";

export default function FormularioVolante() {
  const [cantidad, setCantidad] = useState("");
  const [tamanio, setTamanio] = useState("");
  const [color, setColor] = useState("");
  const [tipo, setTipo] = useState("");
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRespuesta(null);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/precio/Volante`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cantidad, tamanio, color, tipo }),
        }
      );
      if (!res.ok) throw new Error("Error en la consulta");
      const data = await res.json();
      setRespuesta(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#f0f2f5",
        p: 2,
        gap: 2,
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

      {/* Contenedor del formulario */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          bgcolor: "#e8ebf0",
          p: 2,
          height: "100%",
        }}
      >
        <Paper
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            border: "1px solid #ccc",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography
            variant="h5"
            mb={3}
          >
            Consulta de Volante
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
            <TextField
              label="Tamaño"
              value={tamanio}
              onChange={(e) => setTamanio(e.target.value)}
              required
            />
            <TextField
              label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
            <TextField
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
            >
              Consultar
            </Button>
          </Box>

          {respuesta && (
            <Box
              mt={3}
              p={2}
              bgcolor="#e0f7fa"
              borderRadius={2}
            >
              <Typography variant="subtitle1">Respuesta:</Typography>
              <pre>{JSON.stringify(respuesta, null, 2)}</pre>
            </Box>
          )}

          {error && (
            <Box
              mt={3}
              p={2}
              bgcolor="#ffebee"
              borderRadius={2}
            >
              <Typography
                variant="subtitle1"
                color="error"
              >
                Error: {error}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
