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
import styles from "../navbar/navbarStyle.module.scss";
import companyLogo from "../navbar/logo.jpg";
import Image from "next/image";

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
        <Box
          container
          spacing={4}
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
              <Image
                className={styles.imageStyle}
                src={companyLogo}
                alt="Company Logo"
                width={35}
                height={35}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                THE CART
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "gray.300" }}>
              A modern e-commerce platform built with Next JS, Material UI, and
              backend is supported by MongoDB. It follows best practices for a
              seamless shopping experience.
            </Typography>
            <Typography variant="body2" sx={{ color: "gray.400" }}>
              This project demonstrates responsive design, state management, API
              integration, and user authentication.
            </Typography>
          </Box>

          <Box item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Developer Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "gray.300" }}>
              This project was developed by Rohan Prasad Gupta as part of a full
              stack development portfolio.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <IconButton
                href="https://www.linkedin.com/in/rohanprasadgupta/"
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
                href="https://github.com/RohanPrasadGupta"
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
                href="https://rohanpdgupta-portfolio.netlify.app/"
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
                href="mailto:rohanprasadgupta4@gmail.com"
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
              Looking for opportunities in Full Stack development. Feel free to
              contact for collaborations or job opportunities.
            </Typography>
          </Box>
        </Box>

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
            © {new Date().getFullYear()} THE CART. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray.400", display: "flex", alignItems: "center" }}
          >
            Made with{" "}
            <FavoriteIcon
              sx={{ mx: 0.5, fontSize: "0.875rem", color: "#ef4444" }}
            />{" "}
            by Rohan Prasad Gupta
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
