// eslint-disable-next-line no-unused-vars
import React from "react";
import { Fragment, useState } from "react";
import classes from "./SortBy.module.css";
import Popover from "@mui/material/Popover";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { change_sorting } from "../../store/slices/sortSlice";

const sortOptions = [
  {
    id: 1,
    type: "ascending",
    name: "Alphabetically (A-Z)",
  },
  {
    id: 2,
    type: "descending",
    name: "Alphabetically (Z-A)",
  },
  {
    id: 3,
    type: "most_trending",
    name: "Most Trending",
  },
  {
    id: 4,
    type: "least_trending",
    name: "Least Trending",
  },
];

const SortDialog = ({ onSort, sortType, onClose }) => {
  return (
    <div className={classes.sort__dialog}>
      {sortOptions?.map((item) => (
        <Fragment key={item.id}>
          <button
            className={
              sortType === item.type
                ? classes["sort__dialog__button--active"]
                : ""
            }
            onClick={() => {
              onSort(item.type);
              onClose();
            }}
          >
            {item.name}
          </button>
          {item.id !== sortOptions[sortOptions.length - 1].id && (
            <Divider className={classes.divider} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

const SortBy = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { sort } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (value) => {
    dispatch(change_sorting(value));
  };

  const open = Boolean(anchorEl);
  const id = open ? "sort-options" : undefined;

  return (
    <div className={classes.sort__wrapper}>
      <button
        className={classes.sort__button}
        onClick={handleClick}
        id="sort_button"
        aria-label="sort_button"
      >
        <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
      </button>
      {open && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiPaper-root": {
              background: "transparent",
            },
          }}
        >
          <SortDialog
            onSort={handleSort}
            sortType={sort}
            onClose={handleClose}
          />
        </Popover>
      )}
    </div>
  );
};

export default SortBy;
