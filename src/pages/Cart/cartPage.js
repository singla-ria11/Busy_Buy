//
import CartInfo from "../../components/Cart/cartInfo";
import style from "./cartPage.module.css";
export default function Cart() {
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
