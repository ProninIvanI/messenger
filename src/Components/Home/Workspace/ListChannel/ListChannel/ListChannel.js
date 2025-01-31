import { useSelector } from "react-redux";
import styles from "./ListChannel.module.css";
import { ButtonChannel } from "../ButtonChannel/ButtonChannel";
import { Search } from "../../Search/Search/Search";
import { useState } from "react";
import imageAddChannel from "../../../../../Images/AddChannel.svg";

export function ListChannel() {
  const channels = useSelector(
    (state) => state.informationOfChannels.channelsUser
  );
  const [addChannel, setAddChannel] = useState(false);
  const [sortedChannels, setSortedChannels] = useState(
    useSelector((state) => state.informationOfChannels.sortedChannelsUser)
  );
  const handleClick = () => {
    if (addChannel === false) {
      setAddChannel(true); 
    } else if (addChannel === true) {
      setAddChannel(false); 
    }
  };
  const currentSearch = useSelector((state) => state.search.searchChannel);
  return (
    <div className={styles.container}>
      <div className={styles.containerUnder}>
        <Search
          array={channels}
          currentSearch={currentSearch}
          sortedArray={sortedChannels}
          setSortedArray={setSortedChannels}
          placeholder={"введите название"}
          styleContainer={styles.containerSearch}
        />
        {sortedChannels && addChannel === false ? (
          sortedChannels.map((channel) => (
            <ButtonChannel key={channel} name={channel} />
          ))
        ) : (
          <div>mem</div>
        )}
      </div>
      <div className={styles.containerUnderButton}>
        <button className={styles.button} onClick={handleClick}>
          <img alt="" src={imageAddChannel} />
        </button>
      </div>
    </div>
  );
}
