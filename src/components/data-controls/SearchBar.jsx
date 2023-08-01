import classes from "./SearchBar.module.css";
import SortBy from "./SortBy";

const SearchBar = ({ searchValue, searchHandler }) => {
  return (
    <div className={classes.search_bar}>
      <div className={classes.search_bar__inner}>
        <span className={classes.searchbar__inner__icon}>
          <i className="fa fa-search"></i>
        </span>
        <input
          type="search"
          id="search"
          className={classes.search_bar__inner__input}
          value={searchValue}
          onChange={searchHandler}
          placeholder="Search..."
        />
      </div>
      <SortBy />
    </div>
  );
};

export default SearchBar;
