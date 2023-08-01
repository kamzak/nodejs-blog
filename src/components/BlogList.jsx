// eslint-disable-next-line no-unused-vars
import React from "react";
import classes from "./BlogList.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NodeJsAPI } from "../../routes/api-routes";
import BlogItem from "./BlogItem";
import SearchBar from "./data-controls/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import SkeletonListItems from "./skeleton/SkeletonListItems";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const BlogList = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounedSearchValue = useDebounce(searchValue, 300);
  const { sort } = useSelector((state) => state.sort);

  const { data, fetchNextPage, hasNextPage, error, isError, isLoading } =
    useInfiniteQuery({
      queryKey: ["BlogList", debounedSearchValue, sort],
      queryFn: async ({ pageParam = 0 }) => {
        try {
          const res = await axios.get(
            NodeJsAPI.posts({
              searchValue: debounedSearchValue,
              sort,
              prevOffset: pageParam,
            })
          );

          const data = res.data;
          return (
            {
              posts: data.posts,
              postsCount: data.postsCount,
              prevOffset: pageParam,
            } || []
          );
        } catch (err) {
          throw new Error("An error occurred while fetching data.");
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.prevOffset + 10 > lastPage.postsCount) {
          return false;
        }

        return lastPage.prevOffset + 10;
      },
      refetchOnWindowFocus: false,
    });

  const posts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.posts];
  }, []);

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
        {!isLoading && posts?.length === 0 && <p>No search results</p>}

        {/* Initial loading skeleton */}
        {isLoading && !posts && <SkeletonListItems />}

        <InfiniteScroll
          className={classes.blog_list__wrapper}
          dataLength={posts ? posts.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<SkeletonListItems />}
        >
          {posts &&
            posts?.map((item) => <BlogItem key={item.id} item={item} />)}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default BlogList;
