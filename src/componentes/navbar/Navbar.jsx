import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
  minimized,
}) {
  const navigate = useNavigate();
  const drawerWidth = minimized ? 60 : 240;

  const items = [
    { text: "Inicio", icon: <HomeIcon />, path: "/" },
    { text: "Chat", icon: <ChatIcon />, path: "/chat" },
    { text: "Configuración", icon: <SettingsIcon />, path: "/config" },
  ];

  const drawerContent = (
    <List>
      {items.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => navigate(item.path)}
          sx={{
            justifyContent: minimized ? "center" : "flex-start",
            px: minimized ? 1 : 2,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: minimized ? 0 : 2,
              justifyContent: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>
          {!minimized && <ListItemText primary={item.text} />}
        </ListItem>
      ))}
    </List>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: drawerWidth,
        transition: "width 0.3s ease",
        borderRight: "1px solid #ddd",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      {drawerContent}
    </Box>
  );
}
