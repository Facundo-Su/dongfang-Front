import React from "react";
import { Box, Button } from "@mui/material";

export default function ProductoButton({ producto }) {
  if (!producto) return null; // No renderiza si no hay producto

  const url = `/productos/${producto.toLowerCase()}`;

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="contained"
        color="error"
        onClick={() => (window.location.href = url)}
      >
        Completar Datos / 填写信息
      </Button>
    </Box>
  );
}
