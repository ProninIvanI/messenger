import { useEffect, useState } from "react";
import styles from "./SearchUsers.module.css"
import imageLoupe from "../../../../../../Images/Loupe.svg"
import { useDispatch } from "react-redux";
import { loadSearchUserOnChannel } from "../../../../../../Store/Slices/SearchSlice";

export function SearchUsers({usersArray, currentSearch, sortedUsers, setSortedUsers, color}) {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    if(inputSearch === "") {
      setSortedUsers(usersArray);
    }
  }, [inputSearch, usersArray, setSortedUsers]);

  useEffect(() => {
    if(currentSearch === "") {
      setSortedUsers(usersArray);
      setInputSearch("")
    }
  }, [currentSearch, usersArray, setSortedUsers])

  const handleChange = (e) => {
    setInputSearch(e.target.value)
    dispatch(loadSearchUserOnChannel(e.target.value))
  }

  const handleClick = () => {
    const filteredList = sortedUsers.filter ( user =>
      user.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setSortedUsers(filteredList);
  }

  return(
    <div className={styles.container} style={{backgroundColor: color}}>
      <input className={styles.input} placeholder="введите имя" value={inputSearch} onChange={handleChange}/>
      <button className={styles.buttonSearch} onClick={handleClick}>
        <img alt='' src={imageLoupe}/>
      </button>
    </div>
  ); 
}