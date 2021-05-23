import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import GET_PRODUCTS from "../src/queries/get-products";
import Print from "../src/components/Print";

export default function Prints(props) {
  return (
    <Layout>
      <div className="container__prints">
        <h1 className="title">PRINTS</h1>
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
