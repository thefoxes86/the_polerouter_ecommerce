import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  transition,
  thumbnailVariants,
  frameVariants,
  imageVariants,
} from "../constants/variablesMation";
import { useInView } from "react-intersection-observer";
export default function Print1(props) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.8,
  });
  // const isVisible = useOnScreen(ref);

  return (
    <>
      <motion.div
        ref={ref}
        className={`print print_1`}
        variants={thumbnailVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <motion.div
          className={`frame ${inView ? "active" : ""}`}
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
            ref={ref}
            className="title__print"
            dangerouslySetInnerHTML={{ __html: props.title }}
          ></h2>
        </motion.div>
      </motion.div>
    </>
  );
}
