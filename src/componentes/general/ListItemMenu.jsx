import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export default function ListItemMenu({ icon: IconComponent, text, onClick }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: "50px",
        mb: 1,
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        display: "flex",
        alignItems: "center",
        width: "calc(100% - 10px)",
        px: 2,
      }}
    >
      <ListItemIcon>
        <IconComponent sx={{ fontSize: "2em", mr: "10px" }} />
      </ListItemIcon>

      <ListItemText>
        <Typography
          variant="h6"
          sx={{ fontSize: "1rem" }}
        >
          {text}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}
