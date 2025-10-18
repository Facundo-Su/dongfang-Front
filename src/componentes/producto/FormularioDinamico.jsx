import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import Sidebar from "../navbar/Sidebar";

export default function DynamicForm({ fields = [], onSubmit, title }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f0f2f5", // fondo de la pantalla
        p: 2,
      }}
    >
      <Sidebar />
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, width: "100%", maxWidth: 400 }}
      >
        {title && (
          <Typography
            variant="h6"
            mb={2}
            textAlign="center"
          >
            {title}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required || false}
              fullWidth
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Enviar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
