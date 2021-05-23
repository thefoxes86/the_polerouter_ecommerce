import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Link from "next/link";

const CartIcon = () => {
  const [cart] = useContext(AppContext);
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : "";
  const totalPrice =
    null !== cart && Object.keys(cart).length ? cart.totalProductsPrice : "";

  return (
    <Link href="/cart">
      <a className="cartIcon block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
        <svg
          id="Raggruppa_113"
          data-name="Raggruppa 113"
          xmlns="http://www.w3.org/2000/svg"
          width="25.149"
          height="22.979"
          viewBox="0 0 25.149 22.979"
        >
          <path
            id="Tracciato_261"
            data-name="Tracciato 261"
            d="M27.543,9.565a.553.553,0,0,0-.424-.212H7.477l-.371-2.3a.538.538,0,0,0-.529-.45H3.029a.529.529,0,1,0,0,1.059h3.1L7.98,18.91h0a.336.336,0,0,0,.026.159l.635,3.812a.538.538,0,0,0,.529.45H24.208a.529.529,0,0,0,0-1.059H9.621l-.477-2.833H24.737a.51.51,0,0,0,.5-.4l2.383-9.054A.425.425,0,0,0,27.543,9.565Zm-3.23,8.842H8.959L7.636,10.412h18.8Z"
            transform="translate(-2.5 -6.6)"
          />
          <path
            id="Tracciato_262"
            data-name="Tracciato 262"
            d="M31.9,77.262a2.449,2.449,0,1,0-2.436,2.462A2.474,2.474,0,0,0,31.9,77.262Zm-3.839,0a1.4,1.4,0,1,1,1.4,1.4A1.412,1.412,0,0,1,28.059,77.262Z"
            transform="translate(-20.514 -56.745)"
          />
          <path
            id="Tracciato_263"
            data-name="Tracciato 263"
            d="M66.124,77.262a2.462,2.462,0,1,0-2.462,2.462A2.474,2.474,0,0,0,66.124,77.262Zm-3.839,0a1.4,1.4,0,1,1,1.4,1.4A1.412,1.412,0,0,1,62.285,77.262Z"
            transform="translate(-45.66 -56.745)"
          />
        </svg>

        {productsCount ? (
          <span className="numberItem">{productsCount}</span>
        ) : (
          ""
        )}
        {/*{ totalPrice ? <span>{ totalPrice }</span> : '' }*/}
      </a>
    </Link>
  );
};

export default CartIcon;
