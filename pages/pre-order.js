import Layout from '../src/components/Layout';
import client from '../src/components/ApolloClient';
import GET_PRODUCTS from '../src/queries/get-products';
import Print0 from '../src/components/Print0';
import Print1 from '../src/components/Print1';
import { motion } from 'framer-motion';
import { titlePost } from '../src/constants/variablesMation';

export default function PreOrder(props) {
  return (
    <Layout>
      <div className='container__prints container__prints_internal'>
        <motion.h1
          initial='initial'
          animate='animate'
          exit='exit'
          variants={titlePost}
          className='title'
        >
          PRE ORDER
        </motion.h1>
        {props.products &&
          props?.products.map((product, index) => {
            return (
              <>
                {index === 1 ? (
                  <Print0
                    key={index}
                    index={index}
                    sourceUrl={product.image.sourceUrl}
                    slug={product.slug}
                    title={product.name}
                  />
                ) : (
                  <Print1
                    key={index}
                    index={index}
                    sourceUrl={product.image.sourceUrl}
                    slug={product.slug}
                    title={product.name}
                  />
                )}
              </>
            );
          })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      products: data?.products?.nodes ? data.products.nodes : [],
    },
    revalidate: 1,
  };
}
