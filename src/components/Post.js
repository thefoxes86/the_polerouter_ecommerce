import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getMonthAndYear } from "../functions";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
    y: 100,
  },
  enter: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.43, 0.13, 0.23, 0.96],
      delayChildren: 0.5,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const frameVariants = {
  hover: {
    scale: 0.95,
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
  },
};

export default function Post(props) {
  return (
    <motion.div
      key={props.data.slug}
      variants={thumbnailVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div className="thumbnail">
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
    </motion.div>
  );
}
