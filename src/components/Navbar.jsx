import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = [
  { title: "Home", link: "/" },
  { title: "Super Heroes", link: "super-heroes" },
  { title: "Parallel", link: "parallel" },
  { title: "Dynamic Parallel", link: "dynamic-parallel" },
  { title: "Dependent Queries", link: "dependent-queries" },
  { title: "Colors", link: "colors" },
  { title: "Infinite", link: "infinite" },
];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Elanany
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => navigate(page.link)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "capitalize",
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    navigate(page.link);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
