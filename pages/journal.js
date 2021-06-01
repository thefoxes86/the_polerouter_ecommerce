import Layout from "../src/components/Layout";
import Link from "next/link";
import client from "../src/components/ApolloClient";
import { getMonthAndYear } from "../src/functions";
import GET_POSTS from "../src/queries/get-posts";
import TransitionPages from "../src/components/TransitionPages";
import Post from "../src/components/Post";

export default function Journal(props) {
  return (
    <Layout>
      <div className="container__journal">
        <h1 class="title">JOURNAL</h1>
        <div className="hero__post">
          {props.posts &&
            props.posts.map((data) => {
              return data.isSticky && <Post data={data} />;
            })}
        </div>
        <div className="column column__1">
          {props.posts &&
            props.posts.slice(1, 3).map((data) => {
              return !data.isSticky && <Post data={data} />;
            })}
        </div>
        <div className="column column__2">
          {props.posts &&
            props.posts.slice(3, 5).map((data) => {
              return !data.isSticky && <Post data={data} />;
            })}
        </div>
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
