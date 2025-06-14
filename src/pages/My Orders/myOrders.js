//
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Internal Imports
import style from "./myOrders.module.css";
import OrdersList from "../../components/Orders/ordersList";
import OrderDetails from "../../components/Orders/orderDetails";
import {
  getAllOrdersAsync,
  myOrdersSelector,
} from "../../redux/reducers/myOrdersReducer";
import { NavLink } from "react-router";
import { Loader } from "../../components/Loader/loader";
import { authSelector } from "../../redux/reducers/authReducer";

export default function MyOrders() {
  const { currentUser } = useSelector(authSelector);
  const { orders, isLoading, error } = useSelector(myOrdersSelector);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrdersList, setShowOrdersList] = useState(false);

  const disptach = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5"; // Orders page background
    disptach(getAllOrdersAsync(currentUser));

    return () => {
      document.body.style.backgroundColor = ""; // Reset to default when leaving Orders page
    };
  }, [disptach, currentUser]);

  useEffect(() => {
    // console.log(error);
    if (orders.length > 0) setSelectedOrder(orders[0]);
  }, [orders]);

  if (isLoading) {
    return (
      <>
        {/* <h3>Loading...</h3> */}
        <Loader />
      </>
    );
  }

  function toggleOrdersList() {
    setShowOrdersList(!showOrdersList);
  }

  if (error) {
    throw new Error(error);

    // return <h3>{error}</h3>;
  }

  if (orders.length === 0 || !selectedOrder) {
    return (
      <div className={style.empty_order_cont}>
        <h2>You have no orders yet!</h2>
        <p>
          Explore our
          <NavLink to="/"> Products </NavLink>
          section to add items to the cart.
        </p>
        <p>Then place your order.</p>
      </div>
    );
  }

  return (
    <div className={style.orders_container}>
      {window.screen.width < 500 && (
        <>
          <h4 className={style.allOrdersHeading} onClick={toggleOrdersList}>
            All Orders
          </h4>
          <div
            className={`${style.allOrdersCont} ${
              showOrdersList ? style.showOrdersList : style.hideOrdersList
            }`}
          >
            <OrdersList
              orders={orders}
              setSelectedOrder={setSelectedOrder}
              selectedOrder={selectedOrder}
              toggleOrdersList={toggleOrdersList}
            />
          </div>
        </>
      )}
      <div className={style.orders_listAndDetails_cont}>
        {window.screen.width > 500 && (
          <OrdersList
            orders={orders}
            setSelectedOrder={setSelectedOrder}
            selectedOrder={selectedOrder}
            toggleOrdersList={toggleOrdersList}
          />
        )}

        <OrderDetails order={selectedOrder} />
      </div>
    </div>
  );
}
