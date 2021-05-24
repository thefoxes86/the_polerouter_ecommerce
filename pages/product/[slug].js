import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client from "../../src/components/ApolloClient";
import AddToCartButton from "../../src/components/cart/AddToCartButton";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/queries/product-by-slug";
import { isEmpty } from "lodash";
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";
import Price from "../../src/components/single-product/price";

export default function Product(props) {
  const { product } = props;

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {product ? (
        <div className="container__journal">
          <h1 class="title">{product.name}</h1>
          <div className="gallery">
            {!isEmpty(product?.galleryImages?.nodes) && (
              <GalleryCarousel gallery={product?.galleryImages?.nodes} />
            )}
          </div>
          <div className="featuredImage">
            <img
              src={product?.image?.sourceUrl}
              alt="Product Image"
              width="100%"
              height="auto"
              srcSet={product?.image?.srcSet}
            />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          >
            <Price
              salesPrice={product?.price}
              regularPrice={product?.regularPrice}
            />
            <AddToCartButton product={product} />
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
