import '../src/styles/main.scss';

import Router from 'next/router';
import NProgress from 'nprogress';
import dynamic from 'next/dynamic';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  // const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  //   ssr: false,
  // });
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />;
    </AnimatePresence>
  );
}

export default MyApp;
