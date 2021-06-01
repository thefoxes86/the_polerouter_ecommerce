import Link from "next/link";
import CartIcon from "./cart/CartIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Nav = () => {
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false);
  const [navPosition, setNavPosition] = useState({
    top: 0,
  });
  const handleMenu = () => {
    isMenuMobileOpen ? setMenuMobileOpen(false) : setMenuMobileOpen(true);
  };
  const router = useRouter();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    if (router.pathname === "/") {
      currentScroll > windowHeight
        ? setNavPosition({ top: 0 })
        : setNavPosition({ top: -120 });
    }
  };

  useEffect(() => {
    // Mount Component
    router.pathname === "/" && setNavPosition({ top: -120 });

    window.addEventListener("scroll", handleScroll);

    // Unmount component
    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.pathname === "/" && setNavPosition({ top: -120 });
    };
  }, []);

  return (
    <nav style={navPosition}>
      <div className="menu__container">
        <div className="logo__menu">
          <Link exact href="/" replace>
            <a className="">
              <img src="/img/logo_menu.png" />
            </a>
          </Link>
        </div>
        <div className="hamburger__menu">
          <div
            className={
              isMenuMobileOpen ? "line__menu line__menu__open" : "line__menu"
            }
            onClick={handleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={
              isMenuMobileOpen ? "items__menu open__menu" : "items__menu"
            }
          >
            <Link exact href="/" replace>
              <a className="item">Home</a>
            </Link>
            <Link exact href="/prints" replace>
              <a className="item">Prints</a>
            </Link>
            <Link exact href="/journal" replace>
              <a className="item">Journal</a>
            </Link>
            <Link exact href="/contact-us" replace>
              <a className="item">Contact Us</a>
            </Link>

            <a
              href="https://www.instagram.com/thepolerouter/"
              className="item instagram_mobile"
            >
              <svg
                id="instagram_mobile"
                data-name="Raggruppa 117"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 25.984 25.985"
              >
                <path
                  id="Tracciato_201"
                  data-name="Tracciato 201"
                  d="M213,269.765h-12.99c-.232-.04-.464-.079-.694-.125a7.178,7.178,0,0,1-5.8-7.08q0-5.784.006-11.566a7.53,7.53,0,0,1,.122-1.387,7.155,7.155,0,0,1,5.574-5.665,7.793,7.793,0,0,1,1.531-.153c3.841-.012,7.679,0,11.517-.009a6.943,6.943,0,0,1,2.952.614,7.072,7.072,0,0,1,4.085,4.92c.079.318.131.645.2.966v12.993a1.725,1.725,0,0,0-.052.217,6.84,6.84,0,0,1-.562,2.011,7.1,7.1,0,0,1-4.92,4.073C213.645,269.652,213.321,269.7,213,269.765Zm-6.506-2.328v.012q2.833,0,5.659,0a5.382,5.382,0,0,0,1.72-.251,4.911,4.911,0,0,0,3.312-4.73c-.027-3.8-.009-7.6-.006-11.392a5.255,5.255,0,0,0-.251-1.671,4.912,4.912,0,0,0-4.73-3.312c-3.8.027-7.6.009-11.395.009a5.248,5.248,0,0,0-1.668.247,4.911,4.911,0,0,0-3.312,4.733c.028,3.8.009,7.593.006,11.392a5.27,5.27,0,0,0,.336,1.907,4.8,4.8,0,0,0,4.29,3.05C202.47,267.457,204.484,267.436,206.495,267.436Z"
                  transform="translate(-193.512 -243.779)"
                  fill="#b1946e"
                />
                <path
                  id="Tracciato_202"
                  data-name="Tracciato 202"
                  d="M208.966,252.547a6.7,6.7,0,1,1-6.674-6.707A6.711,6.711,0,0,1,208.966,252.547Zm-2.322-.015a4.374,4.374,0,1,0-4.376,4.379A4.362,4.362,0,0,0,206.644,252.532Z"
                  transform="translate(-189.276 -239.542)"
                  fill="#b1946e"
                />
                <path
                  id="Tracciato_203"
                  data-name="Tracciato 203"
                  d="M201.192,248.585a1.693,1.693,0,1,1-.009-3.386,1.693,1.693,0,1,1,.009,3.386Z"
                  transform="translate(-181.218 -240.86)"
                  fill="#b1946e"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="account__menu">
          <CartIcon />

          <a
            href="https://www.instagram.com/thepolerouter/"
            className="item instagram_desktop"
          >
            <svg
              id="instagram_desktop"
              data-name="Raggruppa 117"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 25.984 25.985"
            >
              <path
                id="Tracciato_201"
                data-name="Tracciato 201"
                d="M213,269.765h-12.99c-.232-.04-.464-.079-.694-.125a7.178,7.178,0,0,1-5.8-7.08q0-5.784.006-11.566a7.53,7.53,0,0,1,.122-1.387,7.155,7.155,0,0,1,5.574-5.665,7.793,7.793,0,0,1,1.531-.153c3.841-.012,7.679,0,11.517-.009a6.943,6.943,0,0,1,2.952.614,7.072,7.072,0,0,1,4.085,4.92c.079.318.131.645.2.966v12.993a1.725,1.725,0,0,0-.052.217,6.84,6.84,0,0,1-.562,2.011,7.1,7.1,0,0,1-4.92,4.073C213.645,269.652,213.321,269.7,213,269.765Zm-6.506-2.328v.012q2.833,0,5.659,0a5.382,5.382,0,0,0,1.72-.251,4.911,4.911,0,0,0,3.312-4.73c-.027-3.8-.009-7.6-.006-11.392a5.255,5.255,0,0,0-.251-1.671,4.912,4.912,0,0,0-4.73-3.312c-3.8.027-7.6.009-11.395.009a5.248,5.248,0,0,0-1.668.247,4.911,4.911,0,0,0-3.312,4.733c.028,3.8.009,7.593.006,11.392a5.27,5.27,0,0,0,.336,1.907,4.8,4.8,0,0,0,4.29,3.05C202.47,267.457,204.484,267.436,206.495,267.436Z"
                transform="translate(-193.512 -243.779)"
                fill="#b1946e"
              />
              <path
                id="Tracciato_202"
                data-name="Tracciato 202"
                d="M208.966,252.547a6.7,6.7,0,1,1-6.674-6.707A6.711,6.711,0,0,1,208.966,252.547Zm-2.322-.015a4.374,4.374,0,1,0-4.376,4.379A4.362,4.362,0,0,0,206.644,252.532Z"
                transform="translate(-189.276 -239.542)"
                fill="#b1946e"
              />
              <path
                id="Tracciato_203"
                data-name="Tracciato 203"
                d="M201.192,248.585a1.693,1.693,0,1,1-.009-3.386,1.693,1.693,0,1,1,.009,3.386Z"
                transform="translate(-181.218 -240.86)"
                fill="#b1946e"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
