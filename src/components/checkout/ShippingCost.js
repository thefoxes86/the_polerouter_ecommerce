import { useState } from 'react';
import cx from 'classnames';
import { states } from '../../utils/state';

const ShippingCost = ({ handleShippiningCost, shippingCost }) => {
  return (
    <tr className=''>
      <td className='' />
      <td className=''>
        <div className='mb-3'>
          <label className='leading-7 text-sm text-gray-600'>
            State/County
          </label>
          <div className='relative w-full border-none'>
            <select
              onChange={handleShippiningCost}
              value={shippingCost}
              name='state'
              className={cx(
                'bg-gray-100 bg-opacity-50 border border-gray-400 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full'
              )}
            >
              <option value=''>Select a state...</option>
              {states?.map((state, index) => (
                <option key={state?.code ?? index} value={state?.cost ?? ''}>
                  {state?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </td>
      <td className=''>{`£${parseInt(shippingCost).toFixed(2)}`}</td>
    </tr>
  );
};

export default ShippingCost;
