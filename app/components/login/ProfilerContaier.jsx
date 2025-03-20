import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, Button, Divider, Paper } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import GlobalButton from "../Buttons/GlobalButton";

const ProfilerContaier = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <Box sx={{ position: "relative" }}>
      <GlobalButton
        text=""
        icon={<AccountCircleOutlinedIcon />}
        width="32px"
        height="32px"
        onClick={() => setIsOpen(!isOpen)}
        hoverEffect={true}
      />

      {isOpen && (
        <Paper
          ref={dropdownRef}
          elevation={4}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 260,
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 1000,
            animation: "dropdownFade 0.2s",
            "@keyframes dropdownFade": {
              "0%": { opacity: 0, transform: "translateY(-8px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box sx={{ p: 2.5, bgcolor: "#f8fafc" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  mr: 2,
                  bgcolor: "#111827",
                }}
              >
                {getInitials(user?.name)}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {user?.name || "User"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    maxWidth: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.email || ""}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ p: 1 }}>
            {/* <Link href="/pages/account" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                startIcon={<PersonIcon />}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                My Account
              </Button>
            </Link>

            <Link href="/pages/orders" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                My Orders
              </Button>
            </Link> */}

            {/* <Divider sx={{ my: 1 }} /> */}

            <Button
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                py: 1,
                px: 2,
                borderRadius: 1,
                color: "#ef4444",
                "&:hover": { bgcolor: "#fef2f2", color: "#dc2626" },
              }}
            >
              Log Out
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ProfilerContaier;
