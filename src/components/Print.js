import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  transition,
  thumbnailVariants,
  frameVariants,
  imageVariants,
} from "../constants/variablesMation";

export default function Print(props) {
  return (
    <motion.div
      className={`print print_${props.index}`}
      variants={thumbnailVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        className="frame"
        layoutId={props.sourceUrl}
        whileHover="hover"
        variants={frameVariants}
        transition={transition}
      >
        <Link href={`/product/${props.slug}`}>
          <a>
            <motion.img
              whileHover="hover"
              src={props.sourceUrl}
              variants={imageVariants}
              transition={transition}
            />
            <h2 dangerouslySetInnerHTML={{ __html: props.title }}></h2>
          </a>
        </Link>
      </motion.div>
    </motion.div>
  );
}
