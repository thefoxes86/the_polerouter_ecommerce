import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client from "../../src/components/ApolloClient";

import {
  POST_BY_SLUG_QUERY,
  POSTS_SLUGS,
} from "../../src/queries/post-by-slug";
import { isEmpty } from "lodash";
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";

export default function Posts(props) {
  const { post } = props;

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {post ? (
        <div className="single-product container mx-auto my-32 px-4 xl:px-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="product-images">
              {!isEmpty(post?.galleryImages?.nodes) ? (
                <GalleryCarousel gallery={post?.galleryImages?.nodes} />
              ) : !isEmpty(post.image) ? (
                <img
                  src={post?.featuredImage?.node.link}
                  alt="Product Image"
                  width="100%"
                  height="auto"
                  srcSet={post?.featuredImage?.node.link}
                />
              ) : null}
              <img
                src={post?.featuredImage?.node.link}
                alt="Product Image"
                width="100%"
                height="auto"
                srcSet={post?.featuredImage?.node.link}
              />
            </div>
            <div className="product-info">
              <h4
                className="products-main-title text-2xl uppercase"
                dangerouslySetInnerHTML={{ __html: post.title }}
              ></h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
                className="product-description mb-5"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: POST_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      post: data?.post || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: POSTS_SLUGS,
  });

  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((post) => {
      if (!isEmpty(post?.slug)) {
        pathsData.push({ params: { slug: post?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
