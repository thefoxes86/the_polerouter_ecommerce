import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import Form from "../src/components/Form";
import GET_CATEGORIES_QUERY from "../src/queries/get-categories";

export default function ContactUs(props) {
  return (
    <Layout>
      {/*Categories*/}
      <div className="contact__container">
        <div className="content">
          <h1 className="title">CONTACT US</h1>
          <p>
            IF YOU WOULD LIKE TO CONTACT US ABOUT THE PROJECT, PLEASE COMPLETE
            THE FORM BELOW.
          </p>
          <Form />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CATEGORIES_QUERY,
  });

  return {
    props: {
      productCategories: data?.productCategories?.nodes || [],
    },
    revalidate: 1,
  };
}
