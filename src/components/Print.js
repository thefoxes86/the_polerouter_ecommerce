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
          </a>
        </Link>
        <h2
          className="title__print"
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h2>
      </motion.div>
    </motion.div>
  );
}
