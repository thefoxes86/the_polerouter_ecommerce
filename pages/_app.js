import "../src/styles/main.scss";

import Router from "next/router";
import NProgress from "nprogress";
import dynamic from "next/dynamic";
import { AnimateSharedLayout } from "framer-motion";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  // const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  //   ssr: false,
  // });
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />;
    </AnimateSharedLayout>
  );
}

export default MyApp;
