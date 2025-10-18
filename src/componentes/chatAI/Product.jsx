import styled from "@emotion/styled";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function Product() {
  const Img = styled("img")({
    width: "200px",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  });

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        overflow: "hidden",
        mt: 5,
      }}
    >
      <Img src="https://t4.ftcdn.net/jpg/02/11/39/51/360_F_211395181_8d6dr7EyzVsAgcIZtm1o7nhIEfHyJC0I.jpg" />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">Product Name</Typography>
        <Typography variant="body1">Product Description</Typography>
        <Button
          variant="contained"
          color="primary"
        >
          ADD Card
        </Button>
      </Box>

      <Box sx={{ mr: 2 }}>$19.99</Box>
    </Paper>
  );
}
