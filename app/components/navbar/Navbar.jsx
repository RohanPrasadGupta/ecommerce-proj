"use client";
import React from "react";
import styles from "./navbarStyle.module.scss";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbarMain}>
      <div className="navbar-brand">
        <Link href="/pages/dashboard">Logo</Link>
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
        <div className="nav-item">
          <p className="nav-link">Login</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
