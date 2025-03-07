//
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.css";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import {
  removeFromCartAsync,
  updateQuantityAsync,
} from "../../redux/reducers/cartReducer";
import { authSelector } from "../../redux/reducers/authReducer";

export default function CartItem({ item }) {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  function incQuantity() {
    // dispatch(cartActions.incQuantity({ item }))
    dispatch(updateQuantityAsync({ item, currentUser, type: "inc" }));
  }

  function decQuantity() {
    if (item.quantity === 1) {
      dispatch(removeFromCartAsync({ item, currentUser }));
      return;
    }
    // dispatch(cartActions.decQuantity({ item }));
    dispatch(updateQuantityAsync({ item, currentUser, type: "dec" }));
  }

  return (
    <>
      <div className={style.cart_item_cont}>
        <div className={style.cart_item_left_cont}>
          <div className={style.item_img_cont}>
            <img src={item.image} alt={item.title} />
          </div>
          <div className={style.item_details}>
            <div className={style.item_category}>
              <p>{item.category}</p>
            </div>
            <p>{item.title}</p>
          </div>
        </div>
        <div className={style.cart_item_right_cont}>
          <p className={style.item_price}>
            &#8377; {(item.price * 100).toLocaleString("en-IN")}
          </p>
          <div className={style.item_actions_cont}>
            {/* <button className={style.remove_btn}>Remove</button> */}
            <FaTrash
              className={style.remove_icon}
              onClick={() =>
                dispatch(removeFromCartAsync({ item, currentUser }))
              }
            />
            <div className={style.update_quantity}>
              <FaMinus className={style.dec_quantity} onClick={decQuantity} />
              <p>{item.quantity}</p>
              <FaPlus className={style.inc_quantity} onClick={incQuantity} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
