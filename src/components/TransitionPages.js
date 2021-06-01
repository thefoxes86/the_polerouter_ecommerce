import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const spring = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 1.5,
  when: "afterChildren",
};

export default function TransitionPages({ children }) {
  const router = useRouter();
  return (
    <motion.div
      transition={spring}
      key={router.pathname}
      initial={{ x: 0, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 1.5,
          when: "afterChildren",
        },
      }}
      exit={{ x: 0, opacity: 0, transition: { duration: 3.5 } }}
    >
      {children}
    </motion.div>
  );
}
