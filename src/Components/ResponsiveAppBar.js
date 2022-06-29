import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AppContext } from "./../utils";
import { GifBoxRounded } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];


const ResponsiveAppBar = () => {


  
const { account, connect, disconnect } = useContext(AppContext);

console.log(account);

// const connects = () =>{
//   console.log("connects called")
// }


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/search">
              <Button
                // key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Search Bar
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box mb={1} display="flex" justifyContent="center">
              {account ? (
                <Box
                  width="140px"
                  height="42px"
                  bgcolor="white"
                  borderRadius="8px"
                  sx={{ cursor: "pointer" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="black"
                  fontWeight="500"
                  fontSize="16px"
                  onClick={() => disconnect()}
                  style={{ zIndex: 1 }}
                >
                  {account.slice(0, 4) + "..." + account.slice(-4)}
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "fit-content",
                    border: "3px solid #FF8504",
                    borderRadius: "30px",
                    margin: "auto",
                    boxShadow: 4,
                  }}
                >
                  <Box
                    zIndex={1}
                    sx={{
                      cursor: "pointer",
                    }}
                    bgcolor="transparent"
                    width="180px"
                    height="42px"
                    fontFamily="Helvetice-Bold"
                    border="1px solid white"
                    borderRadius="30px"
                    fontSize="14px"
                    color="#ffffff"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => connect()}
                  >
                    CONNECT WALLET
                    <ArrowForwardIosIcon fontSize="small" />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
