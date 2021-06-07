import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition },
  },
};

const frameVariants = {
  hover: { scale: 0.95 },
};

const imageVariants = {
  hover: { scale: 1.1 },
};

export default function Print(props) {
  return (
    <motion.div
      className={`print print_${props.index}`}
      variants={thumbnailVariants}
    >
      <motion.div
        className="frame"
        layoutId={props.sourceUrl}
        whileHover="hover"
        variants={frameVariants}
        transition={transition}
      >
        <Link href={`/product/${props.slug}`} replace>
          <a>
            <motion.img
              src={props.sourceUrl}
              variants={imageVariants}
              transition={transition}
            />
          </a>
        </Link>
      </motion.div>
    </motion.div>
  );
}
