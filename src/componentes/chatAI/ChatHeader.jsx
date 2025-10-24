import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatHeader({ toggleChat }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Typography variant="h6">AI 助手</Typography>
      <IconButton
        size="small"
        onClick={toggleChat}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
