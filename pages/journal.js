import Layout from "../src/components/Layout";
import Link from "next/link";
import client from "../src/components/ApolloClient";
import { getMonthAndYear } from "../src/functions";
import GET_POSTS from "../src/queries/get-posts";
import TransitionPages from "../src/components/TransitionPages";
import { motion } from "framer-motion";
import Post from "../src/components/Post";

const transition = { ease: [0.43, 0.13, 0.23, 0.96], duration: 1 };

const containerJournal = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ...transition,
      staggerChildren: 1.5,
    },
  },
};

const column = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
  },
  transition: {
    delayChildren: 1.5,
    staggerChildren: 1.5,
  },
};

export default function Journal(props) {
  return (
    <Layout>
      <div className="container__journal">
        <h1 class="title">JOURNAL</h1>
        <motion.div className="container__posts" variants={containerJournal}>
          <motion.div
            key="column-1"
            variants={column}
            initial="initial"
            animate="animate"
            className="hero__post"
          >
            {props.posts &&
              props.posts.map((data) => {
                return data.isSticky && <Post data={data} />;
              })}
          </motion.div>
          <motion.div
            key="column-2"
            variants={column}
            initial="initial"
            animate="animate"
            className="column column__1"
          >
            {props.posts &&
              props.posts.slice(1, 3).map((data) => {
                return !data.isSticky && <Post data={data} />;
              })}
          </motion.div>
          <motion.div
            key="column-3"
            variants={column}
            initial="initial"
            animate="animate"
            className="column column__2"
          >
            {props.posts &&
              props.posts.slice(3, 5).map((data) => {
                return !data.isSticky && <Post data={data} />;
              })}
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      posts: data?.posts?.nodes ? data.posts.nodes : [],
    },
    revalidate: 1,
  };
}
