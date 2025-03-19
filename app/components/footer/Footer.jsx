"use client";
import React from "react";
import Link from "next/link";
import { Box, Container, Typography, IconButton, Divider } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Grid from "@mui/material/Grid";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#111827",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocalMallIcon sx={{ mr: 1, fontSize: "2rem" }} />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                ShopHub
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "gray.300" }}>
              A modern e-commerce platform built with React, Material UI, and
              best practices for a seamless shopping experience.
            </Typography>
            <Typography variant="body2" sx={{ color: "gray.400" }}>
              This project demonstrates responsive design, state management, API
              integration, and user authentication.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: "none", m: 0 }}>
              {["Home", "Products", "Categories", "Cart", "Orders"].map(
                (item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link href={`/${item.toLowerCase()}`} passHref>
                      <Typography
                        component="a"
                        variant="body2"
                        sx={{
                          color: "gray.300",
                          textDecoration: "none",
                          "&:hover": {
                            color: "white",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </Box>
                )
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Support
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: "none", m: 0 }}>
              {["About", "Contact", "FAQ", "Privacy Policy", "Terms"].map(
                (item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      passHref
                    >
                      <Typography
                        component="a"
                        variant="body2"
                        sx={{
                          color: "gray.300",
                          textDecoration: "none",
                          "&:hover": {
                            color: "white",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </Box>
                )
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Developer Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "gray.300" }}>
              This project was developed by Rohan Prasad as part of a front-end
              development portfolio.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <IconButton
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                size="small"
                sx={{
                  color: "#0077B5",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://github.com/yourusername"
                target="_blank"
                size="small"
                sx={{
                  color: "#f1f1f1",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://yourportfolio.com"
                target="_blank"
                size="small"
                sx={{
                  color: "#f1f1f1",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <LanguageIcon />
              </IconButton>
              <IconButton
                href="mailto:your.email@example.com"
                size="small"
                sx={{
                  color: "#f1f1f1",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>

            <Typography variant="body2" sx={{ color: "gray.400" }}>
              Looking for opportunities in front-end development and React.js.
              Feel free to contact for collaborations or job opportunities.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "gray.400", mb: { xs: 1, sm: 0 } }}
          >
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray.400", display: "flex", alignItems: "center" }}
          >
            Made with{" "}
            <FavoriteIcon
              sx={{ mx: 0.5, fontSize: "0.875rem", color: "#ef4444" }}
            />{" "}
            by Rohan Prasad
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
