import { Fragment, useCallback, useEffect, useState } from 'react';
import CheckoutCartItem from './CheckoutCartItem';
import { states } from '../../utils/state';
import ShippingCost from './ShippingCost';

const YourOrder = ({ cart, updateShippingCost }) => {
  const [addLineShippingCost, setAddLineShippingCost] = useState(false);
  const [shippingCost, setShippingCost] = useState({ cost: 0, id: '' });

  const handleShippiningCost = (event) => {
    console.log('COST', event.target[event.target.selectedIndex]?.id);
    setShippingCost({
      cost: event.target[event.target.selectedIndex]?.id,
      id: event.target[event.target.selectedIndex]?.cost,
    });
  };

  return (
    <Fragment>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className='checkout-cart table table-hover w-full mb-10'>
            <thead>
              <tr className='woo-next-cart-head-container text-right'>
                <th className='woo-next-cart-heading-el' scope='col' />
                <th className='woo-next-cart-heading-el text-right' scope='col'>
                  Product
                </th>
                <th className='woo-next-cart-heading-el text-right' scope='col'>
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
              <tr className='text-right'>
                <td className='' />
                <td className=''></td>
                <td className='text-right'>
                  <button
                    onClick={() => setAddLineShippingCost(!addLineShippingCost)}
                    className='button__gold'
                    style={{ padding: '0.5rem 1rem', marginBottom: 0 }}
                  >
                    Calculate shipping cost
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
              <tr className='text-right'>
                <td className='' />
                <td className=''>Total</td>
                <td className=''>
                  {`£${
                    parseInt(cart.subtotal.replace('£', '')) +
                    parseInt(shippingCost.cost)
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
