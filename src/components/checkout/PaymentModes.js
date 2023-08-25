import Error from './Error';

const PaymentModes = ({ input, handleOnChange, submit }) => {
  const { errors, paymentMethod } = input || {};

  return (
    <div className='mb-3 order__payments'>
      <Error errors={errors} fieldName={'paymentMethod'} />

      {/*Pay with Paypal*/}
      <div className='form-check woo-next-payment-input-container mt-2'>
        <label className='form-check-label'>
          {/* <input
            onChange={handleOnChange}
            value='paypal'
            className='form-check-input mr-3 img__sub'
            name='paymentMethod'
            type='radio'
            checked='checked'
            onClick={submit}
          /> */}
          <img width='150' src='/img/paypal.png' />
          <span className='woo-next-payment-content'></span>
        </label>
      </div>
      {/*Check Payments*/}
      {/* <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="cheque"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
            checked={"cheque" === paymentMethod}
          />
          <span className="woo-next-payment-content">Check Payments</span>
        </label>
      </div> */}
      {/*Pay with Stripe*/}
      {/* <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="cod"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
            checked={"cod" === paymentMethod}
          />
          <span className="woo-next-payment-content">Cash on Delivery</span>
        </label>
      </div> */}
      {/* <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="jccpaymentgatewayredirect"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
            checked={"jccpaymentgatewayredirect" === paymentMethod}
          />
          <span className="woo-next-payment-content">JCC</span>
        </label>
      </div> */}
      {/* <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="ccavenue"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
            checked={"ccavenue" === paymentMethod}
          />
          <span className="woo-next-payment-content">CC Avenue</span>
        </label>
      </div> */}
    </div>
  );
};

export default PaymentModes;
