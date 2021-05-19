import { Facebook, Instagram, Twitter, Youtube } from "./icons";
import Link from "next/link";

const Footer = () => (
  <footer>
    <h3 className="title">NEWSLETTER</h3>
    <div className="newsletter">
      <input type="text" />
      <input type="submit" />
    </div>
    <div className="copyright">
      <p className="copy">
        Copyright © 2020 Time Honoured Ltd, All rights reserved. |
      </p>
      <Link href="/terms">Terms</Link>
    </div>
  </footer>
);

export default Footer;
