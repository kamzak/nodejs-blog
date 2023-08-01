import classes from "./BlogList.module.css";
import { useQuery } from "@tanstack/react-query";
import { NodeJsAPI } from "../../routes/api-routes";
import BlogItem from "./BlogItem";
import SearchBar from "./data-controls/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import SkeletonListItems from "./skeleton/SkeletonListItems";

const BlogList = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounedSearchValue = useDebounce(searchValue, 300);
  const { sort } = useSelector((state) => state.sort);

  const { data, error, isError, isLoading } = useQuery(
    ["BlogList", debounedSearchValue, sort],
    async () => {
      const res = await fetch(NodeJsAPI.posts(debounedSearchValue, sort));
      if (!res.ok) {
        throw new Error(
          "Wystąpił błąd komunikacji z serwerem, spróbuj ponownie później."
        );
      }
      const data = await res.json();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <section className={classes.blog_list}>
      <SearchBar searchHandler={searchHandler} searchValue={searchValue} />
      <div className={classes.blog_list__wrapper}>
        {!isLoading && data?.length === 0 && <p>No search results</p>}

        {!isLoading ? (
          data?.map((item) => <BlogItem key={item.id} item={item} />)
        ) : (
          <SkeletonListItems />
        )}
      </div>
    </section>
  );
};

export default BlogList;
