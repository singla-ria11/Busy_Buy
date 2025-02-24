//
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.css";
import CartItem from "./cartItem";
import { cartActions, cartSelector } from "../../redux/reducers/cartReducer";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
export default function CartInfo() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function calculateTotal() {
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.price * 100 * item.quantity,
      0
    );
    return cartTotal.toLocaleString("en-IN");
  }

  function placeOrder() {
    setOrderPlaced(true);
    setTimeout(() => {
      navigate("/myorders");
      dispatch(cartActions.clearCart());
      setOrderPlaced(false);
    }, 1000);
  }

  if (cartItems.length === 0) {
    return (
      <div className={style.empty_cart_cont}>
        <h2>Your cart is empty!</h2>
        <p>
          Explore our
          <NavLink to="/"> Products </NavLink>
          section to add items to the cart.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className={style.cart_total_and_checkout_cont}>
        <div className={style.cart_total_cont}>
          <h4>Cart Total : &#8377; {calculateTotal()}</h4>
        </div>
        <button className={style.placeOrder_btn} onClick={placeOrder}>
          {orderPlaced ? "Placing Order..." : "Place Order"}
        </button>
      </div>
      <div className={style.cart_list_cont}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {/* <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem /> */}
      </div>
    </>
  );
}
