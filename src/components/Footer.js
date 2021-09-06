import Link from "next/link";
import FormNewsletter from "./FormNewsletter";

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <h3 className="title">NEWSLETTER</h3>
    <FormNewsletter />
    <div className="copyright">
      <p className="copy">
        Copyright © {year} Time Honoured Ltd, All rights reserved. |
        <Link className="terms" href="/terms">
          Terms
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
