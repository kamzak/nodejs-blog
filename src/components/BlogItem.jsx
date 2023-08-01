import { Avatar } from "@mui/material";
import classes from "./BlogItem.module.css";

const BlogItem = ({ item }) => {
  return (
    <div className={classes.card}>
      <div className={classes.card__top}>
        <Avatar sx={{ width: 42, height: 42 }} />
        <div>
          <p className={classes.card__top__author}>
            John Smith <span>&#8226; Sep 1, 2023</span>
          </p>
          <p className={classes.card__top__role}>
            Frontend Developer at your Team
          </p>
        </div>
      </div>
      <h3 className={classes.card__title}>{item?.title}</h3>
      <p className={classes.card__body}>{item?.body}</p>
    </div>
  );
};

export default BlogItem;
