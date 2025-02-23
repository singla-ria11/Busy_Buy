//
import { useDispatch, useSelector } from "react-redux";
import style from "./filter.module.css";
import { useEffect, useState } from "react";
import {
  productsActions,
  productsSelector,
} from "../../redux/reducers/productsReducer";

export const Filter = () => {
  const [priceRange, setPriceRange] = useState(100100);
  const { filteredProducts, filteredCriteria } = useSelector(productsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(filteredCriteria, "filteredProducts -", filteredProducts);
    dispatch(productsActions.setFilteredProducts());
  }, [filteredCriteria, dispatch]);

  function handlePriceChange(e) {
    setPriceRange(e.target.value);
    dispatch(productsActions.setFilteredPrice({ price: e.target.value }));
  }
  function handleCheckboxChange(event) {
    dispatch(
      productsActions.setFilteredCategory({
        checked: event.target.checked,
        value: event.target.value,
      })
    );
    console.log(event.target.value);
  }

  return (
    <div className={style.filter_cont}>
      <div className={style.filter_sticky_cont}>
        <h2>Filter</h2>
        <div className={style.price_filter}>
          <h3>Price: {priceRange} </h3>
          <input
            type="range"
            min="1"
            max="100100"
            step="10"
            value={priceRange}
            className={style.price_range_input}
            onChange={handlePriceChange}
          />
        </div>
        <div className={style.category_filter}>
          <h3>Category </h3>
          <input
            type="checkbox"
            name="mensClothing"
            id="men"
            value="mens_clothing"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="men">Men's Clothing</label>
          <br />
          <input
            type="checkbox"
            name="womensClothing"
            id="women"
            value="womens_clothing"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="women">Women's Clothing</label>
          <br />
          <input
            type="checkbox"
            name="jewelery"
            id="jewelery"
            value="jewelery"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="jewelery">Jewelery</label>
          <br />
          <input
            type="checkbox"
            name="electronics"
            id="electronics"
            value="electronics"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="electronics">Electronics</label>
          <br />
        </div>
      </div>
    </div>
  );
};
