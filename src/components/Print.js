import React, { useRef } from "react";
import Link from "next/link";
import { motion, useViewportScroll } from "framer-motion";
import {
  transition,
  thumbnailVariants,
  frameVariants,
  imageVariants,
} from "../constants/variablesMation";
import useOnScreen from "../utils/useOnScreen";

export default function Print(props) {
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  // const isVisible = useOnScreen(ref);

  return (
    <>
      {/* {isVisible && `Yep, I'm on screen`} */}
      <motion.div
        ref={ref}
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
    </>
  );
}
