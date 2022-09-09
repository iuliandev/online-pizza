import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: SortItem;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "popularity",
        sortProperty: SortPropertyEnum.RATING,
    },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
        state.searchValue = action.payload;
      },
      setSort(state, action: PayloadAction<SortItem>) {
        state.sort = action.payload;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>){
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
      }
    },
  })
  

  export const selectFilter = (state: RootState) => state.filterSlice;

  export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
  
  export default filterSlice.reducer;