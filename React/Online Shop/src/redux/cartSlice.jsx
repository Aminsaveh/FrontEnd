import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    remove: (state, action) => {
      const foobarNewItems = state.items.filter((item) => item.id !== action.payload);
      state.items = foobarNewItems;
    },
    add: (state, action) => {
      const newProduct = action.payload;
      state.items.push(newProduct);
    },
    clear: (state) => {
      const emptyArray = new Array();
      state.items = emptyArray;
    },
  },
});

export const { add, clear, remove } = productsSlice.actions;
export default productsSlice.reducer;
