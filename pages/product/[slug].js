import { useState } from "react";
import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client from "../../src/components/ApolloClient";
import AddToCartButton from "../../src/components/cart/AddToCartButton";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/queries/product-by-slug";
import { isEmpty } from "lodash";
import Price from "../../src/components/single-product/price";
import Link from "next/link";

export default function Product(props) {
  const { product } = props;
  const [feauredImage, setFeauturedImage] = useState(
    product && product?.image?.sourceUrl
  );

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
        <div className="container__product">
          <h1 class="title">{product.productCategories.nodes[0].name}</h1>
          <div className="gallery">
            {!isEmpty(product?.galleryImages?.nodes) &&
              product?.galleryImages?.nodes.map((item, index) => (
                <img
                  src={item.mediaItemUrl}
                  loading="lazy"
                  alt={item.altText ? item.altText : item.title}
                  onMouseOver={changeImage}
                />
              ))}
          </div>
          <div className="featuredImage">
            <img
              src={feauredImage}
              alt="Product Image"
              width="100%"
              height="auto"
              srcSet={feauredImage}
            />
          </div>
          <div className="content">
            <Link href="/prints" replace>
              <a className="back">back</a>
            </Link>
            <h2 dangerouslySetInnerHTML={{ __html: product.name }}></h2>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
            <div className="details">
              <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              />
              <AddToCartButton product={product} />
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
