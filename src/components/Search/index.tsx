import React from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
// import { SearchContext } from "../../App";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

export const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    // const {setSearchValue} = React.useContext(SearchContext);

    // const onChangeInput = (event) => {setSearchValue(event.target.value)}
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      updateSearchValue(event.target.value);
    }
    const updateSearchValue = React.useCallback(
      debounce((str) => {
        dispatch(setSearchValue(str))
        // setSearchValue(str);
      }, 300), [],
    );
  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input value={value} onChange={onChangeInput} className={styles.input} placeholder="Search favourite pizza..." />
    </div>
  );
};
