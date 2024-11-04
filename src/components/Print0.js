import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  transition,
  thumbnailVariants,
  frameVariants,
  imageVariants,
} from '../constants/variablesMation';
import { useInView } from 'react-intersection-observer';
export default function Print0(props) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.8,
  });
  // const isVisible = useOnScreen(ref);

  return (
    <>
      <motion.div
        ref={ref}
        className={`print print_0`}
        variants={thumbnailVariants}
        initial='initial'
        animate='enter'
        exit='exit'
      >
        <motion.div
          className={`frame ${inView ? 'active' : ''}`}
          whileHover='hover'
          variants={frameVariants}
          transition={transition}
        >
          <Link href={`/product/${props.slug}`}>
            <motion.img
              whileHover='hover'
              src={props.sourceUrl}
              variants={imageVariants}
              transition={transition}
            />
          </Link>
          <h2
            ref={ref}
            className='title__print'
            dangerouslySetInnerHTML={{ __html: props.title }}
          ></h2>
        </motion.div>
      </motion.div>
    </>
  );
}
