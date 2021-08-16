import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getMonthAndYear } from "../functions";
import {
  transition,
  thumbnailVariants,
  frameVariants,
  imageVariants,
} from "../constants/variablesMation";

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
