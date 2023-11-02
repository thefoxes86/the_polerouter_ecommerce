import { useState } from 'react';
import cx from 'classnames';
import { states } from '../../utils/state';

const ShippingCost = ({ handleShippiningCost, shippingCost }) => {
  console.log('RENDER');
  return (
    <tr className=''>
      <td className='' />
      <td className='' />
      <td className='text-right'>
        <div className='mb-3'>
          <label className='leading-7 text-sm text-gray-600'>Country</label>
          <div className='relative w-full border-none'>
            <select
              onChange={handleShippiningCost}
              value={shippingCost.id}
              name='state'
              className={cx(
                'bg-gray-100 bg-opacity-50 border border-gray-400 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-56'
              )}
            >
              <option value=''>Select country</option>
              {states?.map((state, index) => (
                <option
                  key={state?.id ?? index}
                  id={state.cost}
                  value={state?.id}
                >
                  {state?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {`£${parseInt(shippingCost.cost).toFixed(2)}`}
      </td>
    </tr>
  );
};

export default ShippingCost;
