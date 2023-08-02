// eslint-disable-next-line no-unused-vars
import React from "react";
import classes from "./BlogTrending.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NodeJsAPI } from "../../routes/api-routes";
import BlogItem from "./BlogItem";
import SkeletonListItems from "./skeleton/SkeletonListItems";

const BlogTrending = () => {
  const { data, error, isError, isLoading } = useQuery(
    ["BlogTrending"],
    async () => {
      try {
        const res = await axios.get(NodeJsAPI.posts_trending);
        return res.data;
      } catch (err) {
        throw new Error("An error occurred while fetching data.");
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isError) {
    return (
      <div className={classes.blog_trend}>
        <h2 className={classes.blog_trend__title}>Trending</h2>
        <div className={classes.blog_trend__wrapper}>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={classes.blog_trend}>
      <h2 className={classes.blog_trend__title}>Trending</h2>
      <div className={classes.blog_trend__wrapper}>
        {!isLoading && data?.length === 0 && <p>No search results</p>}

        {!isLoading ? (
          data?.map((item) => (
            <BlogItem key={item?.id} item={item} />
          ))
        ) : (
          <SkeletonListItems />
        )}
      </div>
    </section>
  );
};

export default BlogTrending;
