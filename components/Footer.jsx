import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiOutlineFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>{new Date().getFullYear()} Afromart BC. All rights reserved</p>
      <p className="icons">
        <Link href="https://instagram.com">
          <AiFillInstagram />
        </Link>
        <Link href="https://facebook.com">
          <AiOutlineFacebook />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
