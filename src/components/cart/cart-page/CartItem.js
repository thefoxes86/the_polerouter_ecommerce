import { useState } from 'react';
import { v4 } from 'uuid';
import { getUpdatedItems } from '../../../functions';
import { Cross, Loading } from '../../icons';

const CartItem = ({
  item,
  products,
  updateCartProcessing,
  handleRemoveProductClick,
  updateCart,
}) => {
  const [productCount, setProductCount] = useState(item.qty);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  /*
   * When user changes the qty from product input update the cart in localStorage
   * Also update the cart in global context
   *
   * @param {Object} event event
   *
   * @return {void}
   */
  const handleQtyChange = (event, cartKey) => {
    if (process.browser) {
      event.stopPropagation();
      setLoadingUpdate(true);

      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }

      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      let newQty = event.target.value ? parseInt(event.target.value) : 1;

      products?.forEach((item) => {
        if (item.cartKey === cartKey) {
          if (
            item.productId ===
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_LIMITED_CART)
          ) {
            if (newQty > 5) {
              setProductCount(5);
              setLoadingUpdate(false);
              newQty = 5;
            }
          }
          if (
            item.productId ===
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_NORMAL_CART)
          ) {
            if (newQty > 10) {
              setProductCount(10);
              setLoadingUpdate(false);
              newQty = 10;
            }
          }
        }
      });

      // Set the new qty in state.
      setProductCount(newQty);

      if (products.length) {
        const updatedItems = getUpdatedItems(products, newQty, cartKey);

        updateCart({
          variables: {
            input: {
              clientMutationId: v4(),
              items: updatedItems,
            },
          },
        })
          .then((res) => setTimeout(setLoadingUpdate(false), 2000))
          .catch((err) => setTimeout(setLoadingUpdate(false), 2000));
      }
    }
  };

  return (
    <tr className='woo-next-cart-item' key={item.productId}>
      <th className='woo-next-cart-element woo-next-cart-el-close'>
        {/* Remove item */}
        <span
          className='woo-next-cart-close-icon cursor-pointer'
          onClick={(event) =>
            handleRemoveProductClick(event, item.cartKey, products)
          }
        >
          <Cross />
        </span>
      </th>
      {/* <td className='woo-next-cart-element'>
        <img
          width='64'
          src={item.image.sourceUrl}
          srcSet={item.image.srcSet}
          alt={item.image.title}
        />
      </td> */}
      <td className='woo-next-cart-element'>{item.name}</td>
      <td className='woo-next-cart-element title-mobile-only'>price</td>
      <td className='woo-next-cart-element'>£225.00</td>

      {/* Qty Input */}
      <td className='woo-next-cart-element title-mobile-only'>quantity</td>
      <td className='woo-next-cart-element woo-next-cart-qty'>
        {/* @TODO Need to update this with graphQL query */}
        <input
          type='number'
          min='1'
          max={
            item.productId ===
            parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_LIMITED_CART)
              ? 5
              : item.productId ===
                parseInt(process.env.NEXT_PUBLIC_PRODUCT_ID_NORMAL_CART)
              ? 10
              : 100
          }
          disabled={loadingUpdate}
          data-cart-key={item.cartKey}
          className={`woo-next-cart-qty-input form-control`}
          value={productCount}
          onChange={(event) => handleQtyChange(event, item.cartKey)}
        />
        {/* {productCount} */}
      </td>
      <td className='woo-next-cart-element title-mobile-only'>total</td>
      <td className='woo-next-cart-element'>
        {loadingUpdate
          ? 'updating'
          : 'string' !== typeof item.totalPrice
          ? item.totalPrice.toFixed(2)
          : item.totalPrice}
      </td>
    </tr>
  );
};

export default CartItem;
