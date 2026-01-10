import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../navbar/Sidebar";

export default function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // 🧠 Detección automática de minimización
  useEffect(() => {
    const handleResize = () => {
      const fullSidebar = 240;
      const minContentWidth = 300; // ancho mínimo del contenido
      const totalNeeded = fullSidebar + minContentWidth + 24; // margen

      setMinimized(window.innerWidth < totalNeeded);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = minimized ? 60 : 240;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f0f2f5",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        minimized={minimized}
        isMobile={isMobile}
      />

      {/* Barra superior solo en mobile */}
      {isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            p: 1,
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
          justifyContent: "center",
          alignItems: "stretch",
          p: { xs: 1, md: 3 },
          ml: { md: `${sidebarWidth}px`, xs: 0 },
          transition: "margin-left 0.3s ease",
          minWidth: 0, // permite que se reduzca
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            border: "1px solid #ccc",
            overflow: "hidden",
            minWidth: 0, // se achica en pantallas pequeñas
            maxWidth: "1200px",
            bgcolor: "white",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
