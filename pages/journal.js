import Layout from '../src/components/Layout';
import Link from 'next/link';
import client from '../src/components/ApolloClient';
import { getMonthAndYear } from '../src/functions';
import GET_POSTS from '../src/queries/get-posts';
import TransitionPages from '../src/components/TransitionPages';
import { motion } from 'framer-motion';
import Post from '../src/components/Post';
import {
  titlePost,
  column,
  containerJournal,
} from '../src/constants/variablesMation';

export default function Journal(props) {
  return (
    <Layout>
      <div className='container__journal container__journal_internal'>
        <motion.h1
          initial='initial'
          animate='animate'
          exit='exit'
          variants={titlePost}
          className='title'
        >
          JOURNAL
        </motion.h1>
        <motion.div className='container__posts' variants={containerJournal}>
          <motion.div
            key='column-1'
            variants={column}
            initial='initial'
            animate='animate'
            className='hero__post'
          >
            {props.posts &&
              props.posts.map((data) => {
                return data.isSticky && <Post data={data} />;
              })}
          </motion.div>
          <motion.div
            key='column-2'
            variants={column}
            initial='initial'
            animate='animate'
            className='column column__1'
          >
            {props.posts &&
              props.posts.slice(1, 3).map((data) => {
                return !data.isSticky && <Post data={data} />;
              })}
          </motion.div>
          <motion.div
            key='column-3'
            variants={column}
            initial='initial'
            animate='animate'
            className='column column__2'
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
    notFound: true,
    props: {
      posts: data?.posts?.nodes ? data.posts.nodes : [],
    },
    revalidate: 1,
  };
}
