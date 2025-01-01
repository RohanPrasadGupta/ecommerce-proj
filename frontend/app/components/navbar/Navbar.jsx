import React from "react";
import styles from "./navbarStyle.module.scss";
import Link from "next/link";

function Navbar() {
  return (
    <nav className={styles.navbarMain}>
      <div className="navbar-brand">
        <Link href="/pages/dashboard">Logo</Link>
      </div>
      <ul className={styles["navbar-nav-items"]}>
        <li className="nav-item">
          <p className="nav-link">Products</p>
        </li>
        <li className="nav-item">
          <p className="nav-link">Cart</p>
        </li>
        <li className="nav-item">
          <p className="nav-link">Login</p>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
