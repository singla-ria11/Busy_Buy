//
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.css";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import {
  cartActions,
  removeFromCartAsync,
  updateQuantityAsync,
} from "../../redux/reducers/cartReducer";
import { authSelector } from "../../redux/reducers/authReducer";

export default function CartItem({ item }) {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  //   function incQuantity() {
  //     dispatch(cartActions.incQuantity(item));
  //   }

  //   function decQuantity() {
  //     if (item.quantity === 1) {
  //       dispatch(cartActions.removeFromCart(item));
  //       return;
  //     }
  //     dispatch(cartActions.decQuantity(item));
  //   }

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
              <FaMinus
                className={style.dec_quantity}
                onClick={() => {
                  if (item.quantity === 1) {
                    dispatch(removeFromCartAsync({ item, currentUser }));
                    return;
                  }
                  // dispatch(cartActions.decQuantity({ item }));
                  dispatch(
                    updateQuantityAsync({ item, currentUser, type: "dec" })
                  );
                }}
              />
              <p>{item.quantity}</p>
              <FaPlus
                className={style.inc_quantity}
                onClick={() => {
                  // dispatch(cartActions.incQuantity({ item }))
                  dispatch(
                    updateQuantityAsync({ item, currentUser, type: "inc" })
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* <div className={style.cart_item_cont}>
        <div className={style.cart_item_left_cont}>
          <div className={style.item_img_cont}>
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt=""
            />
          </div>
          <div className={style.item_details}>
            <div className={style.item_category}>
              <p>Men's Clothing</p>
            </div>
            <p>Title</p>
          </div>
        </div>
        <div className={style.cart_item_right_cont}>
          <p className={style.item_price}>&#8377; 1200</p>
          <div className={style.item_actions_cont}>
            <button className={style.remove_btn}>Remove</button>
            <FaTrash
              className={style.remove_icon}
              onClick={() => dispatch(cartActions.removeFromCart(item))}
            />
            <div className={style.update_quantity}>
              <p
                className={style.dec_quantity}
                onClick={() => dispatch(cartActions.incQuantity(item))}
              >
                -
              </p>
              <p>1</p>
              <p
                className={style.inc_quantity}
                onClick={() => {
                  if (item.quantity === 1) {
                    dispatch(cartActions.removeFromCart(item));
                    return;
                  }
                  dispatch(cartActions.decQuantity(item));
                }}
              >
                +
              </p>
            </div>
          </div>
        </div>
</div> */
