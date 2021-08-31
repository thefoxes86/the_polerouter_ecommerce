import Link from "next/link";
import FormNewsletter from "./FormNewsletter";

const Footer = () => (
  <footer>
    <h3 className="title">NEWSLETTER</h3>
    <FormNewsletter />
    <div className="copyright">
      <p className="copy">
        Copyright © 2020 Time Honoured Ltd, All rights reserved. |
      </p>
      <Link href="/terms">Terms</Link>
    </div>
  </footer>
);

export default Footer;
