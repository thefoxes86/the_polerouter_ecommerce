import Layout from "../src/components/Layout";
import Link from "next/link";
import client from "../src/components/ApolloClient";
import { getMonthAndYear } from "../src/functions";
import GET_POSTS from "../src/queries/get-posts";

export default function Journal(props) {
  return (
    <Layout>
      <div className="container__journal">
        <h1 class="title">JOURNAL</h1>
        <div className="hero__post">
          {props.posts &&
            props.posts.map((data) => {
              return (
                data.isSticky && (
                  <div key={data.slug}>
                    <img
                      src={data.featuredImage.node.link}
                      alt={data.featuredImage.node.altText}
                    />
                    <h3 dangerouslySetInnerHTML={{ __html: data.title }}></h3>
                    <span>{getMonthAndYear(data.date)}</span>
                    <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                    <Link href={data.uri} replace>
                      <a className="link">Read More</a>
                    </Link>
                  </div>
                )
              );
            })}
        </div>
        <div className="column column__1">
          {props.posts &&
            props.posts.slice(1, 3).map((data) => {
              return (
                !data.isSticky && (
                  <div key={data.slug}>
                    <img
                      src={data.featuredImage.node.link}
                      alt={data.featuredImage.node.altText}
                    />
                    <h3 dangerouslySetInnerHTML={{ __html: data.title }}></h3>
                    <span>{getMonthAndYear(data.date)}</span>
                    <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                    <Link href={data.uri} replace>
                      <a className="link">Read More</a>
                    </Link>
                  </div>
                )
              );
            })}
        </div>
        <div className="column column__2">
          {props.posts &&
            props.posts.slice(3, 5).map((data) => {
              return (
                !data.isSticky && (
                  <div key={data.slug}>
                    <img
                      src={data.featuredImage.node.link}
                      alt={data.featuredImage.node.altText}
                    />
                    <h3 dangerouslySetInnerHTML={{ __html: data.title }}></h3>
                    <span>{getMonthAndYear(data.date)}</span>
                    <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                    <Link href={data.uri} replace>
                      <a className="link">Read More</a>
                    </Link>
                  </div>
                )
              );
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
