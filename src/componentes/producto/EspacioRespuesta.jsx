import { Box, Typography, Button } from "@mui/material";

export function EspacioRespuesta({ respuesta, error, onPedido }) {
  if (!respuesta && !error) return null;

  return (
    <>
      {respuesta && (
        <Box
          mt={3}
          p={3}
          bgcolor="#e0f7fa"
          borderRadius={2}
        >
          <Typography variant="subtitle1">Respuesta:</Typography>

          <pre>{JSON.stringify(respuesta, null, 2)}</pre>

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={onPedido}
          >
            Hacer pedido
          </Button>
        </Box>
      )}

      {error && (
        <Box
          mt={3}
          p={3}
          bgcolor="#ffebee"
          borderRadius={2}
        >
          <Typography color="error">Error: {error}</Typography>
        </Box>
      )}
    </>
  );
}
