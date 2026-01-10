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
import MainLayout from "../componentes/layouts/MainLayout";
import { DatosCliente } from "../componentes/producto/DatosCliente";
import { EnviarPedido } from "../componentes/producto/EnviarPedido";
import { EspacioRespuesta } from "../componentes/producto/EspacioRespuesta";

export default function FormularioVolante() {
  const [cantidad, setCantidad] = useState("");
  const [tamanio, setTamanio] = useState("");
  const [color, setColor] = useState("");
  const [tipo, setTipo] = useState("");
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRespuesta(null);
    setError(null);

    if (Number(cantidad) < 1000) {
      setError("La cantidad mínima es 1000 / 最低数量1000");
      return;
    }

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

  // ---------------- ENVÍO DEL PEDIDO ----------------
  const handleClienteSubmit = async (datosCliente) => {
    try {
      await EnviarPedido({
        tipoProducto: "Volante",
        endpoint: "/api/precio/pedido",
        producto: {
          tipoProducto: "Volante",
          cantidad,
          tamanio,
          color,
          tipo,
        },
        cliente: {
          nombreLocal: datosCliente.nombreLocal,
          direccion: datosCliente.direccion,
          localidad: datosCliente.localidad,
          contacto: datosCliente.contacto,
          comprobante: datosCliente.comprobante,
        },
      });

      alert("✅ Pedido enviado con éxito");
      setOpenDialog(false);
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, md: 4 },
          minWidth: 0, // permite que se achique junto al sidebar
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: "800px",
            p: { xs: 3, md: 6 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: 3,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
            bgcolor: "white",
            mx: 2, // margen lateral para que no toque los bordes en mobile
          }}
        >
          <Typography
            variant="h4"
            mb={3}
          >
            Consulta de Volante
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              fullWidth
              error={Number(cantidad) < 1000 && cantidad !== ""}
              helperText="La cantidad mínima es 1000 / 最低数量1000"
            />

            <FormControl
              fullWidth
              required
            >
              <InputLabel id="tamanio-label">Tamaño</InputLabel>
              <Select
                labelId="tamanio-label"
                value={tamanio}
                label="Tamaño"
                onChange={(e) => setTamanio(e.target.value)}
              >
                <MenuItem value="20x28">20x28</MenuItem>
                <MenuItem value="40x28">40x28</MenuItem>
                <MenuItem value="40x56">40x56</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                value={color}
                label="Color"
                onChange={(e) => setColor(e.target.value)}
              >
                <MenuItem value="BI COLOR">BI COLOR</MenuItem>
                <MenuItem value="FULL COLOR">FULL COLOR</MenuItem>
              </Select>
            </FormControl>

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
                <MenuItem value="OBRA">OBRA</MenuItem>
                <MenuItem value="ILUST">ILUST</MenuItem>
              </Select>
            </FormControl>

            <Box
              display="flex"
              gap={2}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
              >
                Consultar
              </Button>
            </Box>
          </Box>
          <EspacioRespuesta
            respuesta={respuesta}
            error={error}
            onPedido={() => setOpenDialog(true)}
          />
          <DatosCliente
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onSubmit={handleClienteSubmit}
          />
        </Paper>
      </Box>
    </MainLayout>
  );
}
