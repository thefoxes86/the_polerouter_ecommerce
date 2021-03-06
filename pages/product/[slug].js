import { useState, useContext } from 'react';
import Layout from '../../src/components/Layout';
import { AppContext } from '../../src/components/context/AppContext';
import { useRouter } from 'next/router';
import client from '../../src/components/ApolloClient';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import Price from '../../src/components/single-product/price';
import { motion } from 'framer-motion';
import { titlePost } from '../../src/constants/variablesMation';

export default function Product(props) {
  const { product } = props;
  const [feauredImage, setFeauturedImage] = useState(
    product && product?.galleryImages?.nodes[0].mediaItemUrl
  );
  const [cart, setCart] = useContext(AppContext);

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const changeImage = (e) => {
    setFeauturedImage(e.target.src);
  };

  return (
    <Layout>
      {product ? (
        <div className='container__product'>
          <motion.h1
            initial='initial'
            animate='animate'
            exit='exit'
            variants={titlePost}
            className='title'
          >
            {product.name}
          </motion.h1>
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={titlePost}
            className='gallery'
          >
            {!isEmpty(product?.galleryImages?.nodes) &&
              product?.galleryImages?.nodes.map((item, index) => (
                <motion.img
                  key={index}
                  src={item.mediaItemUrl}
                  alt={item.altText ? item.altText : item.title}
                  onMouseOver={changeImage}
                  srcSet={item.mediaItemUrl}
                />
              ))}
          </motion.div>
          <div className='featuredImage'>
            <motion.img
              src={feauredImage}
              alt='Product Image'
              width='100%'
              height='auto'
              srcSet={feauredImage}
            />
          </div>
          <div className='content'>
            {/* <motion.h2
              initial="initial"
              animate="animate"
              exit="exit"
              variants={titlePost}
              dangerouslySetInnerHTML={{ __html: product.name }}
            ></motion.h2> */}
            <motion.div
              initial='initial'
              animate='animate'
              exit='exit'
              variants={titlePost}
              className='description'
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></motion.div>
            <motion.div
              initial='initial'
              animate='animate'
              exit='exit'
              variants={titlePost}
              className='details'
            >
              <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              />
              {product.stockQuantity > 0 ? (
                <AddToCartButton product={product} />
              ) : (
                <button
                  disabled='disabled'
                  className='addToCart opacity-50 cursor-not-allowed'
                >
                  SOLD
                </button>
              )}
              {product.productId === 74 || product.productId === 73 ? (
                <p style={{ marginTop: 20, fontStyle: 'italic' }}>
                  Free poster with every set of postcards purchased whilst
                  stocks last. Just add the postcards to your cart and we???ll
                  include a free poster with your order.
                </p>
              ) : (
                ''
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        ''
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      product: data?.product || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_SLUGS,
  });

  const pathsData = [];

  data?.products?.nodes &&
    data?.products?.nodes.map((product) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({ params: { slug: product?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
