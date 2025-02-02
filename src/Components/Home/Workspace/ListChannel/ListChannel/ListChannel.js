import { useSelector } from "react-redux";
import styles from "./ListChannel.module.css";
import { ButtonChannel } from "../ButtonChannel/ButtonChannel";
import { Search } from "../../Search/Search/Search";
import { useState } from "react";
import imageAddChannel from "../../../../../Images/AddChannel.svg";
import { ButtonAddAndRemoveChannel } from "../ButtonAddAndRemoveChannel/ButtonAddAndRemoveChannel";

export function ListChannel() {
  const channelsUser = useSelector(
    (state) => state.informationOfChannels.channelsUser
  );
  const allChannels = useSelector(
    (state) => state.informationOfChannels.channels
  );
  const [buttonAddChannel, setButtonAddChannel] = useState(false);
  const [sortedChannels, setSortedChannels] = useState(
    useSelector((state) => state.informationOfChannels.sortedChannelsUser)
  );
  const currentSearchChannelsUser = useSelector(
    (state) => state.search.searchChannelUser
  );
  const currentSearchAllChannels = useSelector(
    (state) => state.search.searchChannelAmongAllChannel
  );

  const [sortedAllChannels, setSortedAllChannels] = useState(
    useSelector((state) => state.informationOfChannels.sortedChannels)
  );

  const handleClickAddChannel = () => {
    if (buttonAddChannel === false) {
      setButtonAddChannel(true);
    } else if (buttonAddChannel === true) {
      setButtonAddChannel(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerUnder}>
        {buttonAddChannel === false ? (
          <>
            <Search
              array={channelsUser}
              currentSearch={currentSearchAllChannels}
              sortedArray={sortedChannels}
              setSortedArray={setSortedChannels}
              placeholder={"введите название"}
              styleContainer={styles.containerSearch}
            />
            {sortedChannels &&
              sortedChannels.map((channel) => (
                <ButtonChannel key={channel} name={channel} />
              ))}
          </>
        ) : (
          <>
            <Search
              array={allChannels}
              currentSearch={currentSearchChannelsUser}
              sortedArray={sortedAllChannels}
              setSortedArray={setSortedAllChannels}
              placeholder={"введите название"}
              styleContainer={styles.containerSearch}
            />
            {sortedAllChannels &&
              sortedAllChannels.map((channel) =>
                channelsUser.includes(channel) ? (
                  <ButtonAddAndRemoveChannel
                    key={channel}
                    name={channel}
                    isUser={false}
                  />
                ) : (
                  <ButtonAddAndRemoveChannel
                    key={channel}
                    name={channel}
                    isUser={true}
                  />
                )
              )}
          </>
        )}
      </div>
      <div className={styles.containerUnderButton}>
        <button
          className={`${styles.button} ${
            buttonAddChannel ? styles.buttonCheck : ""
          }`}
          onClick={handleClickAddChannel}
        >
          <img alt="" src={imageAddChannel} />
        </button>
      </div>
    </div>
  );
}
