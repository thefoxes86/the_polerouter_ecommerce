import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import GET_CATEGORIES_QUERY from "../src/queries/get-categories";
import TransitionPages from "../src/components/TransitionPages";

export default function Categories(props) {
  const { productCategories } = props;

  return (
    <Layout>
      <TransitionPages>
        {/*Categories*/}
        <div className="categories product-categories-container container mx-auto my-32 px-4 xl:px-0">
          <h2 className="text-2xl mb-5 uppercase">Categories</h2>
          <ParentCategoriesBlock productCategories={productCategories} />
        </div>
      </TransitionPages>
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
