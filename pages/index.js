import Layout from '../src/components/Layout';
import Link from 'next/link';
import client from '../src/components/ApolloClient';
import { motion } from 'framer-motion';
import GET_HOME from '../src/queries/get-home';
import Print1 from '../src/components/Print1';
import Print0 from '../src/components/Print0';
import Post from '../src/components/Post';
import { column, containerJournal } from '../src/constants/variablesMation';
import ComingSoon from '../src/components/ComingSoon';
import Testimonsials from '../src/components/Testimonals';

export default function Home(props) {
  return (
    <Layout>
      <div className='container__hero'>
        <div className='logo'>
          <img src='/img/logo.png' alt='' />
          <Link href='/pre-order'>
            <button className='button'>Pre Order</button>
          </Link>
        </div>
        <div className='hero__image'></div>
        <div className='description'>
          <p>
            THE FIRST BOOK TO FOCUS SOLELY
            <br />
            ON THE UNIVERSAL GENÈVE POLEROUTER. <br />A CELEBRATION OF ITS
            HISTORY, DESIGN AND DIVERSITY.
          </p>

          <div className='scroll__down'>scroll down</div>
        </div>
      </div>
      <div className='container__testimonials'>
        <Testimonsials />
      </div>
      <div className='container__book'>
        {/* <ComingSoon /> */}
        {props.products &&
          props.products.map((product, index) => {
            return (
              <>
                {product.productCategories.nodes.map(({ name }, i) => (
                  <>
                    {name === 'Book' && (
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
                    )}
                  </>
                ))}
              </>
            );
          })}
      </div>
      {/*       
      <div className='container__journal'>
        <h1 className='title'>JOURNAL</h1>
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
          <div className='button__all_posts'>
            <Link href='/journal'>
              <a className='button'>ALL POSTS</a>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className='container__prints'>
        <h1 className='title'>RARITIES</h1>
        {props.products &&
          props.products.map((product, index) => {
            return (
              <>
                {product.productCategories.nodes.map(({ name }, i) => (
                  <>
                    {name === 'Rarities' && (
                      <>
                        {console.log(index)}
                        {index === 2 ? (
                          <>
                            <Print0
                              key={index}
                              index={index}
                              sourceUrl={product.image.sourceUrl}
                              slug={product.slug}
                              title={product.name}
                            />
                          </>
                        ) : (
                          <>
                            {console.log(product.name)}
                            <Print1
                              key={index}
                              index={index}
                              sourceUrl={product.image.sourceUrl}
                              slug={product.slug}
                              title={product.name}
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                ))}
              </>
            );
          })}
      </div> */}
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
