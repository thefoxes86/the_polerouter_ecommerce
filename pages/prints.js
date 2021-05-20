import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import GET_PRODUCTS from "../src/queries/get-products";

export default function Prints(props) {
  return (
    <Layout>
      <div className="container__prints">
        <h1 className="title">PRINTS</h1>
        {props.products &&
          props.products.slice(0, 2).map((product, index) => {
            return (
              <div
                className={`print print_${index}`}
                style={{ backgroundImage: `url(${product.image.sourceUrl})` }}
              ></div>
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
