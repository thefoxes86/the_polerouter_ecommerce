import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import { motion } from "framer-motion";
import {
  titlePost,
  column,
  containerJournal,
} from "../src/constants/variablesMation";
import GET_TERMS from "../src/queries/get-terms";

export default function Journal(props) {
  return (
    <Layout>
      <div className="container__journal container__journal_internal">
        <motion.h1
          initial="initial"
          animate="animate"
          exit="exit"
          variants={titlePost}
          className="title"
        >
          TERMS
        </motion.h1>
        <motion.div className="container__terms" variants={containerJournal}>
          <motion.p
            key="column-1"
            variants={column}
            initial="initial"
            animate="animate"
            className="textContent"
            dangerouslySetInnerHTML={{__html: props.content}}
          >
            
          </motion.p>
        </motion.div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_TERMS,
  });

  return {
    props: {
      content: data?.page?.content ? data.page.content : [],
    },
    revalidate: 1,
  };
}
