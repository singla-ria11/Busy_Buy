import style from "../../pages/My Orders/myOrders.module.css";
import { formatDate } from "../../Utils/helpers";

export default function OrderDetails({ order }) {
  function itemsCount() {
    const totalNumOfItems = order.products.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalNumOfItems;
  }

  function calculateSubTotal() {
    const subTotal = order.products.reduce(
      (total, item) => total + item.price * 100 * item.quantity,
      0
    );
    return subTotal;
  }

  function calculateTotal() {
    const total = calculateSubTotal() + order.shipping;
    return total;
  }

  return (
    <div className={style.order_details}>
      <p className={style.order_id_heading}>
        Order ID: <span className={style.order_id_small}>{order.id}</span>
      </p>
      <div className={`${style.order_info_container} ${style.row_layout}`}>
        {/* Summary */}
        <div className={style.order_summary}>
          <h3>Order Summary</h3>
          <p className={style.summary_item}>
            <strong>Created at:</strong>{" "}
            <span>{formatDate(order.createdAt)}</span>
          </p>
          <p className={style.summary_item}>
            <strong>Items Count:</strong> <span>{itemsCount()}</span>
          </p>
          <hr />
          <p className={style.summary_item}>
            <strong>Subtotal:</strong>{" "}
            <span>&#8377; {calculateSubTotal().toLocaleString("en-IN")}</span>
          </p>
          <p className={style.summary_item}>
            <strong>Shipping:</strong> <span>&#8377; {order.shipping}</span>
          </p>
          <hr />
          <p className={`${style.summary_item} ${style.total}`}>
            <strong>Total:</strong>{" "}
            <span>&#8377; {calculateTotal().toLocaleString("en-IN")}</span>
          </p>
        </div>
        {/* Ordered Products */}
        <div className={style.ordered_items}>
          <h3>Ordered Products</h3>
          <div className={style.items_container}>
            {order.products.map((item, index) => (
              <div
                key={index}
                className={`${style.item_card} ${style.new_item_ui}`}
              >
                <div className={style.left_cont}>
                  <div className={style.item_img_cont}>
                    <img
                      src={item.image}
                      className={style.item_img}
                      alt="title"
                    />
                  </div>
                  <div className={style.item_info}>
                    <p className={style.title}>{item.title}</p>
                    <p className={style.quantity}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className={style.price}>&#8377; {item.price * 100}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// &#8377;

// OrderDetailsRow deleted componnet content..................

// export default function OrderDetailsRow({ order }) {
//     return (
//       <div className="order-details">
//         <p className="order-id-heading">
//           Order ID: <span className="order-id-small">{order.id}</span>
//         </p>
//         <div className="order-info-container row-layout">
//           <div className="order-summary">
//             <h3>Order Summary</h3>
//             <p className="summary-item">
//               <strong>Created at:</strong> <span>{order.date}</span>
//             </p>
//             <p className="summary-item">
//               <strong>Items Count:</strong> <span>{order.itemsCount}</span>
//             </p>
//             <hr />
//             <p className="summary-item">
//               <strong>Subtotal:</strong> <span>{order.subtotal}</span>
//             </p>
//             <p className="summary-item">
//               <strong>Shipping:</strong> <span>{order.shipping}</span>
//             </p>
//             <hr />
//             <p className="summary-item total">
//               <strong>Total:</strong> <span>{order.total}</span>
//             </p>
//           </div>
//           <div className="ordered-items">
//             <h3>Ordered Products</h3>
//             <div className="items-container">
//               {order.items.map((item, index) => (
//                 <div key={index} className="item-card new-item-ui">
//                   <div className="left_cont">
//                     <div className="item_img_cont">
//                       <img
//                         src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
//                         className="item_img"
//                         alt="title"
//                       />
//                     </div>
//                     <div className="item-info">
//                       <p className="title">{item.title}</p>
//                       <p className="quantity">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                   <p className="price">{item.price}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
