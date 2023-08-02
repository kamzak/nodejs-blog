// eslint-disable-next-line no-unused-vars
import React, { Fragment } from "react";
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
import BlogTrending from "./BlogTrending";
import { useMediaQuery } from "@mui/material";

const BlogList = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounedSearchValue = useDebounce(searchValue, 300);
  const { sort } = useSelector((state) => state.sort);

  const isMobile = useMediaQuery("(max-width:680px)");

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
        <p className={classes.error}>{error.message}</p>

        {isMobile ? <BlogTrending /> : null}
      </div>
    );
  }

  return (
    <section className={classes.blog_list}>
      <SearchBar searchHandler={searchHandler} searchValue={searchValue} />
      <div className={classes.blog_list__wrapper}>
        {!isLoading && posts?.length === 0 && (
          <Fragment>
            <p>No search results</p>
            {isMobile ? <BlogTrending /> : null}
          </Fragment>
        )}

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
            posts?.map((item, index) => {
              // Show trendings on mobile after max 10 posts
              // If posts < 10, show trendings after last post
              const showTrending =
                (posts.length >= 10 && index === 9) ||
                (posts.length < 10 && index === posts.length - 1);

              return (
                <Fragment key={item.id}>
                  <BlogItem item={item} />
                  {showTrending && isMobile && <BlogTrending />}
                </Fragment>
              );
            })}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default BlogList;
