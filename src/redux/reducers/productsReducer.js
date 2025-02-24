//
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  allProducts: [],
  filteredProducts: [],
  filteredCriteria: {
    searchQuery: "",
    price: 100100,
    categories: {
      mens_clothing: false,
      womens_clothing: false,
      jewelery: false,
      electronics: false,
    },
  },
  isLoading: false,
  error: null,
};

export const fetchAndStoreProductsAsync = createAsyncThunk(
  "products/fetchAndStore",
  async (_, rejectWithValue) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const products = data.map((prod) => {
        prod.category = prod.category
          .toLowerCase()
          .replace(/[']/g, "")
          .replace(/[\s]/g, "_");
        return prod;
      });
      console.log(products);

    //   setTimeout(()=>{return products},2000)

      return products;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filteredCriteria.searchQuery = action.payload.query;
    },
    setFilteredCategory: (state, action) => {
      state.filteredCriteria.categories[action.payload.value] =
        action.payload.checked;
    },
    setFilteredPrice: (state, action) => {
      state.filteredCriteria.price = Number(action.payload.price);
    },
    setFilteredProducts: (state, action) => {
      const { searchQuery, price, categories } = state.filteredCriteria;

      const { mens_clothing, womens_clothing, jewelery, electronics } =
        categories;
      state.filteredProducts = state.allProducts.filter((prod) => {
        if (mens_clothing || womens_clothing || jewelery || electronics) {
          return (
            prod.price * 100 <= state.filteredCriteria.price &&
            prod.title
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase()) &&
            categories[prod.category]
          );
        }
        return (
          prod.price * 100 <= price &&
          prod.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndStoreProductsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAndStoreProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchAndStoreProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //   .addCase("products/setFilteredCategory", (state, action) => {
    //     // const { mens_clothing, womens_clothing, jewelery, electronics } =
    //     //   state.filteredCriteria.categories;

    //     console.log("extraReducer working for - products/setFilteredCategory");

    //     state.filteredProducts = state.allProducts.filter((prod) => {
    //       if (state.filteredCriteria.categories[prod.category]) {
    //         return true;
    //       }
    //       return false;
    //     });
    //   });
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;

export const productsSelector = (state) => state.productsReducer;
