import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => dispatch(changeFilter(e.target.value))}
      placeholder="Search contacts by name"
      className={css.input}
    />
  );
};

export default SearchBox;