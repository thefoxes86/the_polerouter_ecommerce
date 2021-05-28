import Layout from "../src/components/Layout";
import Link from "next/link";
import client from "../src/components/ApolloClient";
import { getMonthAndYear } from "../src/functions";
import GET_HOME from "../src/queries/get-home";
import Print from "../src/components/Print";
import Post from "../src/components/Post";

export default function Home(props) {
  return (
    <Layout>
      <div className="container__hero">
        <div className="logo">
          <img src="/img/logo.png" alt="" />
        </div>
        <div className="hero__image"></div>
        <div className="description">
          <p>
            THE FIRST BOOK TO FOCUS SOLELY ON THE UNIVERSAL GENÈVE POLEROUTER. A
            <br />
            CELEBRATION OF ITS HISTORY, ITS DESIGN AND ITS DIVERSITY.
          </p>
          <div className="scroll__down">scroll down</div>
        </div>
      </div>
      <div className="container__prints">
        <h2 className="title">PRINTS</h2>
        {props.products &&
          props.products.slice(0, 2).map((product, index) => {
            return (
              <Print
                index={index}
                sourceUrl={product.image.sourceUrl}
                slug={product.slug}
              />
            );
          })}
      </div>
      <div className="container__journal">
        <h2 class="title">JOURNAL</h2>
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
        <div className="button__all_posts">
          <Link href="/journal" replace>
            <a className="button">ALL POSTS</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_HOME,
  });

  return {
    props: {
      products: data?.products?.nodes ? data.products.nodes : [],
      posts: data?.posts?.nodes ? data.posts.nodes : [],
    },
    revalidate: 1,
  };
}
