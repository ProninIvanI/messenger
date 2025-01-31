import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import imageLoupe from "../../../../../Images/Loupe.svg";
import { useDispatch } from "react-redux";
import { loadSearchUserOnChannel } from "../../../../../Store/Slices/SearchSlice";

export function Search({
  array,
  currentSearch,
  sortedArray,
  setSortedArray,
  color,
  placeholder,
  styleContainer,
}) {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    if (inputSearch === "") {
      setSortedArray(array);
    }
  }, [inputSearch, array, setSortedArray]);

  useEffect(() => {
    if (currentSearch === "") {
      setSortedArray(array);
      setInputSearch("");
    }
  }, [currentSearch, array, setSortedArray]);

  const handleChange = (e) => {
    setInputSearch(e.target.value);
    dispatch(loadSearchUserOnChannel(e.target.value));
  };

  const handleClick = () => {
    const filteredList = sortedArray.filter((child) =>
      child.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setSortedArray(filteredList);
  };

  return (
    <div className={`${!styleContainer ? styles.container : styleContainer}`} style={{ backgroundColor: color }}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={inputSearch}
        onChange={handleChange}
      />
      <button className={styles.buttonSearch} onClick={handleClick}>
        <img alt="" src={imageLoupe} />
      </button>
    </div>
  );
}
