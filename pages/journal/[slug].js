import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client from "../../src/components/ApolloClient";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  POST_BY_SLUG_QUERY,
  POSTS_SLUGS,
} from "../../src/queries/post-by-slug";
import { isEmpty } from "lodash";
import { titlePost, transition } from "../../src/constants/variablesMation";

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
        <div className="container__post">
          <motion.h1
            key={post?.title}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={titlePost}
            className="title"
            dangerouslySetInnerHTML={{ __html: post?.title }}
          ></motion.h1>
          <div className="gallery">
            {!isEmpty(post?.galleryImages?.nodes) && (
              <img
                src={post?.image?.sourceUrl}
                loading="lazy"
                onMouseOver={changeImage}
              />
            )}
            {!isEmpty(post?.galleryImages?.nodes) &&
              post?.galleryImages?.nodes.map((item, index) => (
                <motion.img
                  src={item.mediaItemUrl}
                  loading="lazy"
                  alt={item.altText ? item.altText : item.title}
                  onMouseOver={changeImage}
                />
              ))}
          </div>
          <div className="featuredImage">
            <motion.img
              transition={transition}
              src={post?.featuredImage?.node.link}
              alt="Post Image"
              width="100%"
              height="auto"
              srcSet={post?.featuredImage?.node.link}
            />
          </div>
          <div className="content">
            <motion.div
              variants={titlePost}
              initial="initial"
              animate="animate"
              exit="exit"
              className="description"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></motion.div>
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
