import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import qs from "qs";
// import { useNavigate } from "react-router-dom";

import { selectFilter, setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import { categories, Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);
  // const { searchValue } = React.useContext(SearchContext);
  // const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = React.useCallback( (id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const order = sort.sortProperty.includes("desc");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // await axios
    //   .get(
    //     `https://6311c117f5cba498da84e1ac.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   });
    // try {
    //   const { data } = await axios.get(
    //     `https://6311c117f5cba498da84e1ac.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   );
    dispatch(
      fetchPizzas({
        sortBy,
        order: String(order),
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    // } catch (error) {
    //   console.log("Error", error);
    // }

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     categoryId,
  //     currentPage,
  //   })

  //   navigate(`?${queryString}`)
  // }, [categoryId, sort, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {/* <Sort sortValue={sortType} onChangeSort={(i) => setSortType(i)} /> */}
        <Sort value={sort} />
      </div>
      <h2 className="content__title">{categories[categoryId]} pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
            <h2>
              Page not found <span>😕</span>
            </h2>
            <p>
            Unfortunately, it's not possible to get pizzas. Please try again later.
            </p>
        </div>
      ) : (
        <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>
      )}
      
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
