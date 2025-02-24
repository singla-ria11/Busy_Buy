//
import { useState } from "react";
import style from "./home.module.css";
import { Filter } from "../../components/Filter/filter";
import ProductsList from "../../components/Products/productsList";

export default function Home() {
  return (
    <>
      <div className={style.home_cont}>
        {/* <div className={style.search_cont}>
          <input
            type="text"
            placeholder="Search"
            className={style.search_input}
          />
        </div> */}
        <div className={style.products_and_filter_cont}>
          <Filter />
          <ProductsList />
        </div>
      </div>
    </>
  );
}
