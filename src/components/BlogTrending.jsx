import classes from "./BlogTrending.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NodeJsAPI } from "../../routes/api-routes";
import BlogItem from "./BlogItem";
import SkeletonListItems from "./skeleton/SkeletonListItems";

const BlogTrending = () => {
  const { data, isLoading } = useQuery(
    ["BlogTrending"],
    async () => {
      const res = await axios.get(NodeJsAPI.posts_trending);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <section className={classes.blog_trend}>
      <h2 className={classes.blog_trend__title}>Trending</h2>
      <div className={classes.blog_trend__wrapper}>
        {!isLoading ? (
          data?.map((item) => <BlogItem key={item?.id} item={item} />)
        ) : (
          <SkeletonListItems />
        )}
      </div>
    </section>
  );
};

export default BlogTrending;
