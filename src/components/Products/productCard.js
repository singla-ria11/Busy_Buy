//
import { toast } from "react-toastify";
import style from "./products.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router";
import { cartActions, cartSelector } from "../../redux/reducers/cartReducer";

export function ProductCard({ product }) {
  const [addingTocart, setAddingTocart] = useState(false);
  const { authSuccess } = useSelector(authSelector);
  const { cartItems } = useSelector(cartSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleAddToCart() {
    if (!authSuccess) {
      navigate("/signin");
      toast.info("Please login to add product to the cart");
      return;
    }
    setAddingTocart(true);
    setTimeout(() => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        dispatch(cartActions.incQuantity({ item: cartItem }));
      } else {
        dispatch(cartActions.addToCart({ item: product }));
      }
      setAddingTocart(false);
      toast.success("Product has been added to cart");
    }, 800);
  }

  return (
    <div className={style.product_card}>
      {/* <h4>Product Card</h4> */}
      <div className={style.prod_img_cont}>
        <img src={product.image} alt="" />
      </div>
      <h3>
        {product.title.length > 40
          ? product.title.substring(0, 40) + "..."
          : product.title}
      </h3>
      <p>&#8377; {(product.price * 100).toFixed(0)}</p>
      <button className={style.addTocart_btn} onClick={handleAddToCart}>
        {addingTocart ? "Adding to cart..." : "Add to Cart "}
      </button>
    </div>
  );
}

//   src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
