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
import LoginUser from "../login/LoginUser";
import UserLoginSignup from "../login/UserLoginSignup";
import ProfilerContaier from "../login/ProfilerContaier";
import Cookies from "js-cookie";
import GlobalButton from "../Buttons/GlobalButton";

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
function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleOpen = () => setOpen(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("cookieTCart");
    window.location.reload();
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
        <GlobalButton
          type="button"
          text="Cart"
          onClick={() => router.push("/pages/cart")}
          icon={<MdShoppingCart />}
          width="100px"
          height="32px"
          hoverEffect={true}
        />
        {user !== null ? (
          <ProfilerContaier handleLogout={handleLogout} />
        ) : (
          <GlobalButton
            type="button"
            text="Login"
            onClick={handleOpen}
            icon={<PersonTwoToneIcon />}
            width="100px"
            height="32px"
            hoverEffect={true}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
