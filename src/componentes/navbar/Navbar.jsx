import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar({ title, links }) {
  return (
    <AppBar
      position="static"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Toolbar>
        {/* Título */}

        <img src="//Front end/src/assets/dongfangLogo.png"></img>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>

        {/* Links */}
        <Box>
          {links.map((link, i) => (
            <Button
              key={i}
              color="inherit"
              onClick={link.onClick}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
