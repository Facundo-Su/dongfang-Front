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
import { enviarConsulta } from "../componentes/funciones/LimitarConsulta";
import { DatosCliente } from "../componentes/producto/DatosCliente";
import { EspacioRespuesta } from "../componentes/producto/EspacioRespuesta";
import { EnviarPedido } from "../componentes/producto/EnviarPedido";

export default function FormularioEtiqueta() {
  const [ancho, setAncho] = useState("");
  const [largo, setLargo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tipo, setTipo] = useState("");

  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  // ---------------- CONSULTA DE PRECIO ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRespuesta(null);
    setError(null);

    if (!enviarConsulta()) return;

    if (Number(cantidad) < 100) {
      setError("La cantidad mínima es 100 / 最低数量100");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/precio/Etiqueta`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ancho,
            largo,
            cantidad,
            tipo,
          }),
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
        tipoProducto: "Etiqueta",
        endpoint: "/api/precio/pedido",
        producto: {
          tipoProducto: "Etiqueta",
          ancho: ancho,
          largo: largo,
          cantidad: cantidad,
          tipo: tipo,
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
          p: 4,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 800,
            p: 6,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: 3,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h4">填写询问贴纸价格</Typography>

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
            />

            <TextField
              label="Largo (cm)"
              type="number"
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              required
            />

            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              error={Number(cantidad) < 100 && cantidad !== ""}
              helperText="La cantidad mínima es 100 / 最低数量100"
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

          <EspacioRespuesta
            respuesta={respuesta}
            error={error}
            onPedido={() => setOpenDialog(true)}
          />

          {/* ---------- DIALOGO DE DATOS CLIENTE ---------- */}
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
