import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Sidebar from "../componentes/navbar/Sidebar";

export default function FormularioEtiqueta() {
  const [ancho, setAncho] = useState("");
  const [largo, setLargo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tipo, setTipo] = useState("");
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRespuesta(null);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/precio/Etiqueta`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ancho, largo, cantidad, tipo }),
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
          alignItems: "center",
          p: 4,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: "800px", // ahora más ancho
            p: 6,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: 3,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            mb={3}
          >
            Formulario Personalizado
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Ancho (cm)"
              type="number"
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Largo (cm)"
              type="number"
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              fullWidth
            />

            <FormControl
              fullWidth
              required
            >
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                value={tipo}
                label="Tipo"
                onChange={(e) => setTipo(e.target.value)}
              >
                <MenuItem value="Normal">普通贴纸</MenuItem>
                <MenuItem value="Tamano Especial">特殊形状</MenuItem>
                <MenuItem value="Transparente Vinilo">塑料透明</MenuItem>
                <MenuItem value="Vinilo">塑料</MenuItem>
                <MenuItem value="Dorado">金色（不防水）</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Consultar
            </Button>
          </Box>

          {respuesta && (
            <Box
              mt={3}
              p={3}
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
              p={3}
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
