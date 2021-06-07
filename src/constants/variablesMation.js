const ease = [0.43, 0.13, 0.23, 0.96];
const transition = { ease: ease, duration: 1.5 };

const containerJournal = {
  transition: {
    ...transition,
    delayChildren: 1.5,
    staggerChildren: 1.5,
  },
};

const column = {
  initial: {
    opacity: 1,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: ease,
    },
  },
  transition: {
    delayChildren: 1.5,
    staggerChildren: 1.5,
  },
};

const titlePost = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 1,
      ease: ease,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
  },
  transition: {
    delayChildren: 1.5,
    staggerChildren: 1.5,
  },
};

export { transition, column, containerJournal, titlePost };
