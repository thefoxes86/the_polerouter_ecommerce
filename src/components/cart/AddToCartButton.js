import { useState, useContext, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { v4 } from 'uuid';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { AppContext } from '../context/AppContext';
import { getFormattedCart } from '../../functions';
import GET_CART from '../../queries/get-cart';
import ADD_TO_CART from '../../mutations/add-to-cart';

const AddToCart = (props) => {
  const { product } = props;

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [updatingCart, setUpdatingCart] = useState(false);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      // Update cart data in React Context.
      res?.cart?.contens?.nodes?.forEach((element) => {
        if (
          element?.product?.node?.productId ===
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_LIMITED_CART) &&
          props.product.productId ==
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_LIMITED_CART)
        ) {
          setDisableButton(true);
        } else if (
          element?.productId ===
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_NORMAL_CART) &&
          props.product.productId ===
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_NORMAL_CART)
        ) {
          setDisableButton(true);
        } else {
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
        }
      });
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      setDisableButton(false);
      const currentScroll = window.scrollY;
      const navbar = document.getElementById('navbar_polerouter');

      if (navbar && currentScroll < 20) {
        navbar.classList.add('animate_navbar');

        setTimeout(() => {
          navbar.classList.remove('animate_navbar');
        }, 4000);
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      setDisableButton(false);
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
      }
    },
  });

  // Maximum 5 pcs
  const countLimitedEdition = useRef(0);

  // Maximum 10 pcs
  const countNormaldEdition = useRef(0);
  useEffect(() => {
    cart?.products?.forEach((element) => {
      if (
        element?.productId ===
          parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_LIMITED_CART) &&
        props.product.productId ===
          parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_LIMITED_CART)
      ) {
        console.log('product 1', element.qty);
        countLimitedEdition.current = element.qty;
        countLimitedEdition.current >= 5 && setDisableButton(true);
      }
      if (
        element?.productId ===
          parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_NORMAL_CART) &&
        props.product.productId ===
          parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_NORMAL_CART)
      ) {
        console.log('product 2', element.qty);
        countNormaldEdition.current = element.qty;
        countNormaldEdition.current >= 10 && setDisableButton(true);
      }
    });
  }, [, cart]);

  const handleAddToCartClick = async () => {
    setDisableButton(true);
    setRequestError(null);
    await addToCart();
  };

  return (
    <div>
      {/*	Check if its an external product then put its external buy link */}
      {'ExternalProduct' === product.__typename ? (
        <a
          href={product?.externalUrl ?? '/'}
          target='_blank'
          className='addToCart'
        >
          Buy now
        </a>
      ) : (
        <button
          disabled={disableButton}
          onClick={handleAddToCartClick}
          className={cx('addToCart')}
        >
          {addToCartLoading
            ? 'Adding to cart...'
            : disableButton
            ? 'MAXIMUM ORDER REACHED'
            : 'PRE-ORDER'}
        </button>
      )}
      {/* {showViewCart ? (
        <Link href="/cart">
          <button className="viewCart">View Cart</button>
        </Link>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default AddToCart;
