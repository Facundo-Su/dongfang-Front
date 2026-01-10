import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export function DatosCliente({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    nombreLocal: "",
    direccion: "",
    localidad: "",
    contacto: "",
    comprobante: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle textAlign="center">Datos del Cliente / 客户资料</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Nombre del local / 店名"
            name="nombreLocal"
            value={form.nombreLocal}
            onChange={handleChange}
            required
          />

          <TextField
            label="Dirección / 地址"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />

          <TextField
            label="Localidad / 城市"
            name="localidad"
            value={form.localidad}
            onChange={handleChange}
            required
          />

          <TextField
            label="Teléfono o WeChat / 电话或微信"
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            required
          />

          <DialogActions sx={{ px: 0, mt: 2 }}>
            <Button onClick={onClose}>Cancelar</Button>

            <Button
              type="submit"
              variant="contained"
            >
              Enviar pedido
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
