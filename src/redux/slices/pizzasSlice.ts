import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { Sort } from "./filterSlice";

type PizzaParams = {
  sortBy: string;
  category: string;
  order: string;
  search: string;
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk<Pizza[], PizzaParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {sortBy, category, order, search, currentPage} = params;
        const { data } = await axios.get<Pizza[]>(
            `https://6311c117f5cba498da84e1ac.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
          );
      return data;
    }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
       state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //       state.status = 'loading';
  //       state.items = [];
  //       console.log('Request is processing...');
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //       state.items = action.payload;
  //       state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //       state.status = 'error';
  //       state.items = [];
  //       // console.log('Request rejected!');
  //   },
    
  // },
});

export const selectPizzas = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;