import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="footer text-center rounded">
      <span className="rounded">Shane Koehler { new Date().getFullYear() }</span>
    </footer>
  );
}

export default Footer;
