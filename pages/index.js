import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import Link from "next/link";
import client from "../src/components/ApolloClient";
import { getMonthAndYear } from "../src/functions";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import GET_POSTS from "../src/queries/get-posts";

export default function Home(props) {
  const { products, productCategories, heroCarousel } = props || {};

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
        <div
          className="print"
          style={{ backgroundImage: `url(img/img_home.png)` }}
        ></div>
        <div
          className="print2"
          style={{ backgroundImage: `url(img/img_home.png)` }}
        ></div>
      </div>
      <div className="container__journal">
        <h2 class="title">JOURNAL</h2>
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
                    <p dangerouslySetInnerHTML={{ __html: data.excerpt }}></p>
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
                    <p dangerouslySetInnerHTML={{ __html: data.excerpt }}></p>
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
                    <p dangerouslySetInnerHTML={{ __html: data.excerpt }}></p>
                    <Link href={data.uri} replace>
                      <a className="link">Read More</a>
                    </Link>
                  </div>
                )
              );
            })}
        </div>
        <div className="button__all_posts">
          <a className="button">ALL POSTS</a>
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
      products: data?.products?.nodes ? data.products.nodes : [],
      posts: data?.posts?.nodes ? data.posts.nodes : [],
    },
    revalidate: 1,
  };
}
