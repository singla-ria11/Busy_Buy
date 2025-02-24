//
import { useEffect } from "react";
import { ProductCard } from "./productCard";
import style from "./products.module.css";
import {
  fetchAndStoreProductsAsync,
  productsSelector,
} from "../../redux/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/loader";

export default function ProductsList() {
  const { allProducts, filteredProducts, isLoading, error } =
    useSelector(productsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAndStoreProductsAsync());
  }, [dispatch]);

  if (error) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return (
      <>
        {/* <h3>Loading...</h3> */}
        <Loader />
      </>
    );
  }

  return (
    <div className={style.products_cont}>
      {/* <Loader /> */}
      {filteredProducts.length === 0 && (
        <>
          <h3>Sorry! </h3>
          <h4>No matching products found</h4>
        </>
      )}
      <div className={style.prod_grid_cont}>
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
