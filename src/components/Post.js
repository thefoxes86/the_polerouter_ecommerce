import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getMonthAndYear } from "../functions";

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

export default function Post(props) {
  return (
    <>
      <motion.div
        key={props.data.slug}
        className="thumbnail"
        variants={thumbnailVariants}
      >
        <motion.div
          className="frame"
          whileHover="hover"
          variants={frameVariants}
          transition={transition}
        >
          <Link href={`/journal/${props.data.slug}`} replace>
            <a>
              <motion.img
                src={props.data.featuredImage.node.link}
                alt={props.data.featuredImage.node.altText}
                variants={imageVariants}
                transition={transition}
              />
            </a>
          </Link>
        </motion.div>
      </motion.div>
      <h3 dangerouslySetInnerHTML={{ __html: props.data.title }}></h3>
      <span>{getMonthAndYear(props.data.date)}</span>
      <p dangerouslySetInnerHTML={{ __html: props.data.content }}></p>
      <Link href={`/journal/${props.data.slug}`} replace>
        <a className="link">Read More</a>
      </Link>
    </>
  );
}
