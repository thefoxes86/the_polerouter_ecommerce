import { Fragment, useCallback, useEffect, useState } from 'react';
import CheckoutCartItem from './CheckoutCartItem';
import { states } from '../../utils/state';
import ShippingCost from './ShippingCost';

const YourOrder = ({ cart, updateShippingCost }) => {
  const [addLineShippingCost, setAddLineShippingCost] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

  const handleShippiningCost = useCallback(
    (event) => {
      setShippingCost(event.target.value);
    },
    [shippingCost]
  );

  return (
    <Fragment>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className='checkout-cart table table-hover w-full mb-10'>
            <thead>
              <tr className='woo-next-cart-head-container text-left'>
                <th className='woo-next-cart-heading-el' scope='col' />
                <th className='woo-next-cart-heading-el' scope='col'>
                  Product
                </th>
                <th className='woo-next-cart-heading-el' scope='col'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.products.length &&
                cart.products.map((item) => (
                  <CheckoutCartItem key={item.productId} item={item} />
                ))}
              {/*SHipping Cost*/}
              <tr className=''>
                <td className='' />
                <td className=''>Shipping Cost</td>
                <td className=''>
                  <button
                    onClick={() => setAddLineShippingCost(!addLineShippingCost)}
                  >
                    Calculate
                  </button>
                </td>
              </tr>
              {addLineShippingCost && (
                <ShippingCost
                  handleShippiningCost={handleShippiningCost}
                  shippingCost={shippingCost}
                />
              )}
              {/*Total*/}
              <tr className=''>
                <td className='' />
                <td className=''>Total</td>
                <td className=''>
                  {`£${
                    parseInt(cart.subtotal.replace('£', '')) +
                    parseInt(shippingCost)
                  }.00`}
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default YourOrder;
