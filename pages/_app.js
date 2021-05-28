import "../src/styles/main.scss";

import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const spring = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 1.5,
  when: "afterChildren",
};

function MyApp({ Component, pageProps }) {
  // const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  //   ssr: false,
  // });
  const router = useRouter();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        transition={spring}
        key={router.pathname}
        initial={{ x: 0, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 0, opacity: 0, scale: 1.1 }}
        id="page-transition-container"
      >
        {/* <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="0, 0, 0"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      /> */}
        <Component {...pageProps} />;
      </motion.div>
    </AnimatePresence>
  );
}

export default MyApp;
