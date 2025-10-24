import React, { useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../componentes/navbar/Sidebar";

export default function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#f0f2f5",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Barra superior solo en mobile */}
      {isMobile && (
        <Box
          sx={{
            width: "100%",
            p: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "#222", "&:hover": { bgcolor: "transparent" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Contenedor principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          alignItems: "stretch",
          p: { xs: 1, md: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
