//
import { useSelector } from "react-redux";
import CartInfo from "../../components/Cart/cartInfo";
import style from "./cartPage.module.css";
import { cartSelector } from "../../redux/reducers/cartReducer";
import { myOrdersSelector } from "../../redux/reducers/myOrdersReducer";
export default function Cart() {
  const { error: orderError } = useSelector(myOrdersSelector);

  if (orderError) {
    throw new Error(orderError);
  }

  return (
    <>
      <div className={style.cart_cont}>
        <div className={style.cart_main_cont}>
          <h2 className={style.cart_heading}>My Cart</h2>
          <CartInfo />
        </div>
      </div>
    </>
  );
}
