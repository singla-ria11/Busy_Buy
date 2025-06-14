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

  if (allProducts.length === 0) {
    return (
      <div className={style.emptyProducts_cont}>
        <h3>Sorry! </h3>
        <h4>No products are available currently.</h4>
        <h4>They will be available soon.</h4>
      </div>
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
