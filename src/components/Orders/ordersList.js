//
import style from "../../pages/My Orders/myOrders.module.css";
import { formatDate } from "../../Utils/helpers";
export default function OrdersList({
  orders,
  setSelectedOrder,
  selectedOrder,
}) {


  return (
    <div className={style.orders_list}>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className={`${style.order_item} ${
            selectedOrder.id === order.id ? style.selected : ""
          }`}
          onClick={() => setSelectedOrder(order)}
        >
          <p>{formatDate(order.createdAt)}</p>
          <p className={style.order_id}>Order ID: {order.id}</p>
        </div>
      ))}
    </div>
  );
}
