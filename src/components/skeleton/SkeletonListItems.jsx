// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Skeleton } from "@mui/material";
import classes from "./SkeletonListItems.module.css";

const SkeletonListItems = () => {
  return (
    <div className={classes.skeleton} data-testid="skeleton">
      {[...Array(3)].map((_, index) => {
        return (
          <Box key={index} className={classes.skeleton__wrapper}>
            <Box className={classes.skeleton__header}>
              <Skeleton

                variant="circular"
                height={42}
                width={42}
                className={classes.skeleton__element}
                animation="wave"
              />
              <Box>
                <Skeleton
                  variant="text"
                  width={150}
                  className={classes.skeleton__element}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={100}
                  className={classes.skeleton__element}
                  animation="wave"
                />
              </Box>
            </Box>
            <Box>
              <Skeleton
                variant="text"
                width={"80%"}
                sx={{ fontSize: "1.5rem", my: 2 }}
                className={classes.skeleton__element}
                animation="wave"
              />
            </Box>
            <Box>
              <Skeleton
                variant="text"
                width={"60%"}
                sx={{ fontSize: ".75rem", mb: 0.5 }}
                className={classes.skeleton__element}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={"40%"}
                sx={{ fontSize: ".75rem" }}
                className={classes.skeleton__element}
                animation="wave"
              />
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

export default SkeletonListItems;
