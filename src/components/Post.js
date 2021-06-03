import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getMonthAndYear } from "../functions";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const frameVariants = {
  hover: {
    scale: 0.95,
  },
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
  },
  exit: {
    duration: 2.5,
  },
};

export default function Post(props) {
  return (
    <>
      <motion.div
        key={props.data.slug}
        className="thumbnail"
        variants={thumbnailVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <motion.div
          className="frame"
          layoutId={props.data.featuredImage.node.link}
          whileHover="hover"
          variants={frameVariants}
          transition={transition}
        >
          <Link href={`/journal/${props.data.slug}`} replace>
            <a>
              <motion.img
                whileHover="hover"
                variants={imageVariants}
                transition={transition}
                src={props.data.featuredImage.node.link}
                alt={props.data.featuredImage.node.altText}
              />
            </a>
          </Link>
        </motion.div>
      </motion.div>
      <motion.h3
        transition={transition}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, ...transition }}
        dangerouslySetInnerHTML={{ __html: props.data.title }}
      ></motion.h3>
      <span>{getMonthAndYear(props.data.date)}</span>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, ...transition }}
        dangerouslySetInnerHTML={{ __html: props.data.content }}
      ></motion.p>
      <Link href={`/journal/${props.data.slug}`} replace>
        <a className="link">Read More</a>
      </Link>
    </>
  );
}
