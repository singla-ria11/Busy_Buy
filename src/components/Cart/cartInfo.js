//
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.css";
import CartItem from "./cartItem";
import { cartSelector, clearCartAsync } from "../../redux/reducers/cartReducer";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { authSelector } from "../../redux/reducers/authReducer";
import { Loader } from "../Loader/loader";
import { addNewOrderAsync } from "../../redux/reducers/myOrdersReducer";
import { toast } from "react-toastify";
export default function CartInfo() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, databaseCart, isLoading } = useSelector(cartSelector);
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  function calculateTotal() {
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.price * 100 * item.quantity,
      0
    );
    return cartTotal;
  }

  async function placeOrder() {
    if (orderPlaced) return;
    setOrderPlaced(true);

    try {
      await dispatch(
        addNewOrderAsync({ currentUser, cartItems, databaseCart })
      ).unwrap();
      await dispatch(clearCartAsync({ currentUser })).unwrap();

      toast.success("Order Placed Successfully");
      navigate("/myorders");
    } catch (error) {
      toast.error("Attempt to place Order has Failed!");
    } finally {
      setOrderPlaced(false);
    }
  }

  // rendering based on different states

  if (isLoading) {
    return (
      <>
        {/* <h3>Loading...</h3> */}
        <Loader />
      </>
    );
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
          <h4>
            Cart Total : &#8377; {calculateTotal().toLocaleString("en-IN")}
          </h4>
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
