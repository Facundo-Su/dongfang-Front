import React from "react";
import { Drawer, List, Toolbar, Typography, Box, Divider } from "@mui/material";
import { Home, Info } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/dongfangLogo.png";
import ListItemMenu from "../general/ListItemMenu";

const drawerWidth = 260;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ textAlign: "center" }}>
      {/* Encabezado con logo */}
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
        }}
      >
        <Box
          sx={{
            background: "rgba(255,255,255,0.3)",
            borderRadius: "50%",
            p: 1.2,
            mb: 1,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "65px", height: "auto", borderRadius: "50%" }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "#ffcc00",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          东方印刷
        </Typography>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Menú */}
      <List sx={{ mt: 2, px: 1 }}>
        <ListItemMenu
          icon={Home}
          text="Inicio"
          selected={location.pathname === "/"}
          onClick={() => navigate("/")}
        />
        <ListItemMenu
          icon={Info}
          text="Formulario Volante"
          selected={location.pathname === "/productos/volante"}
          onClick={() => navigate("/productos/volante")}
        />
        <ListItemMenu
          icon={Info}
          text="Formulario Etiqueta"
          selected={location.pathname === "/productos/etiqueta"}
          onClick={() => navigate("/productos/etiqueta")}
        />
      </List>
    </Box>
  );

  return (
    <>
      {/* Drawer permanente para pantallas grandes */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #dee9f5 0%, #c2d4ea 100%)",
            color: "#222",
            borderRight: "none",
            boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Drawer temporal para pantallas pequeñas */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #dee9f5 0%, #c2d4ea 100%)",
            color: "#222",
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
