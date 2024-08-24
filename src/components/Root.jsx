import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

export default function Root() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{padding: 1}}>
        <Outlet />
      </Box>
    </>
  );
}
