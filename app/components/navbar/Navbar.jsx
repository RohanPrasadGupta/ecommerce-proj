"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbarStyle.module.scss";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import companyLogo from "./logo.jpg";
import Image from "next/image";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import Modal from "@mui/material/Modal";
import UserLoginSignup from "../login/UserLoginSignup";
import ProfilerContaier from "../login/ProfilerContaier";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
function Navbar({ user, setUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className={styles.navbarMain}>
      {open && (
        <Modal open={open}>
          <div style={style}>
            <UserLoginSignup setUser={setUser} setOpen={setOpen} />
          </div>
        </Modal>
      )}
      <div className="navbar-brand">
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          href="/pages/dashboard"
        >
          <Image
            className={styles.imageStyle}
            src={companyLogo}
            alt="Company Logo"
            width={35}
            height={35}
          />
          <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            THE CART
          </p>
        </Link>
      </div>
      <div className={styles["navbar-nav-items"]}>
        <div className={styles.cartButtonDiv}>
          <button
            onClick={() => router.push("/pages/cart")}
            className={styles.cartButton}
          >
            <MdShoppingCart />
            <p>Cart</p>
          </button>
        </div>
        {user !== null ? (
          <ProfilerContaier handleLogout={handleLogout} />
        ) : (
          <div className={styles.cartButtonDiv}>
            <button onClick={handleOpen} className={styles.cartButton}>
              <PersonTwoToneIcon />
              <p>Login</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
