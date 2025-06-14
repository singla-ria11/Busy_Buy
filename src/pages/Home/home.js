//
import style from "./home.module.css";
import { Filter } from "../../components/Filter/filter";
import ProductsList from "../../components/Products/productsList";
import { useState } from "react";

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  return (
    <>
      <div className={style.home_cont}>
        <div className={style.home_search_and_filter}>
          <p className={style.home_filter} onClick={toggleFilter}>
            {showFilter ? '<<' :'>>'}
          </p>
          <div className={`${style.filterComponent_cont} ${showFilter ? style.showFilter : style.hideFilter}`}>
            <Filter />
          </div>
          <input
            type="text"
            placeholder="Search"
            className={style.search_input}
          />
        </div>
        <div className={style.products_and_filter_cont}>
          {window.screen.width > 500 && <Filter />}
          {/* <Filter /> */}
          <ProductsList />
        </div>
      </div>
    </>
  );
}
