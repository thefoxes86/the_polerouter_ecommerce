import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getFormattedCart, getUpdatedItems } from "../../../functions";
import CartItem from "./CartItem";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import { isEmpty } from "lodash";

const CartItemsContainer = () => {
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  // Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = !isEmpty(error?.graphQLErrors?.[0])
          ? error.graphQLErrors[0]?.message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  const totalCart = () => {
    let totalPrice = 0;
    cart &&
      cart.products.forEach((product) => {
        totalPrice += product.price * product.qty;
      });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart product-cart-container">
      {cart ? (
        <>
          <h1 className="title">Cart</h1>

          <div className="table__cart">
            <table className="cart-products">
              <thead className="text-left">
                <tr className="woo-next-cart-head-container header-desktop-only">
                  <th scope="col" />
                  <th scope="col" />
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.length &&
                  cart.products.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      updateCartProcessing={updateCartProcessing}
                      products={cart.products}
                      handleRemoveProductClick={handleRemoveProductClick}
                      updateCart={updateCart}
                    />
                  ))}
              </tbody>
            </table>
          </div>

          {/*Cart Total*/}

          <div className="sub__total">
            {/* <h2 className="text-2xl">Cart Total</h2> */}
            <table>
              <tbody>
                <tr>
                  <td className="">
                    Total
                    <span className="price">£{totalCart()}</span>
                  </td>
                </tr>
                <tr>
                  <td className="">
                    Shipping Cost
                    <span className="price">£15.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="">
                    Subtotal
                    <span className="price">
                      {"string" !== typeof cart.totalProductsPrice
                        ? cart.totalProductsPrice.toFixed(2)
                        : cart.totalProductsPrice}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <Link href="/checkout">
              <a className="button__black n-block">Check out</a>
            </Link>
          </div>

          {/* Display Errors if any */}
          {requestError ? (
            <div className="row woo-next-cart-total-container mt-5">
              {" "}
              {requestError}{" "}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <h2 className="title">No items in the cart</h2>
          <Link href="/prints">
            <a className="button__black continue__button">Add New Products</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartItemsContainer;
