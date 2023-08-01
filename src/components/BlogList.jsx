// eslint-disable-next-line no-unused-vars
import React from "react";
import classes from "./BlogList.module.css";
import { useQuery } from "@tanstack/react-query";
import { NodeJsAPI } from "../../routes/api-routes";
import BlogItem from "./BlogItem";
import SearchBar from "./data-controls/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import SkeletonListItems from "./skeleton/SkeletonListItems";
import axios from "axios";

const BlogList = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounedSearchValue = useDebounce(searchValue, 300);
  const { sort } = useSelector((state) => state.sort);

  const { data, error, isError, isLoading } = useQuery(
    ["BlogList", debounedSearchValue, sort],
    async () => {
      try {
        const res = await axios.get(
          NodeJsAPI.posts({ searchValue: debounedSearchValue, sort })
        );
        return res.data || [];
      } catch (err) {
        throw new Error("An error occurred while fetching data.");
      }
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
      <div className={classes.blog_list}>
        <SearchBar searchHandler={searchHandler} searchValue={searchValue} />
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
