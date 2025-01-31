import { useSelector } from "react-redux";
import styles from "./FormAddUserOnChannel.module.css";
import circleAdd from "../../../../../Images/CircleAdd.svg";
import axios from "axios";
import { Search } from "../Search/Search/Search";
import { useState } from "react";

export function FormAddUserOnChannel() {
  const [sortedUsers, setSortedUsers] = useState(
    useSelector((state) => state.users.listFilterUsers)
  );
  const listAllUsers = useSelector((state) => state.users.listUsers);
  const listUsersCurrentChannel = useSelector(
    (state) => state.informationOfChannels.usersCurrentChannel
  );
  const currentChannel = useSelector(
    (state) => state.informationOfChannels.currentChannel
  );
  const currentSearch = useSelector((state) => state.search.searchUserAtAdded);
  const color = "rgb(225, 205, 180)";

  const handleClickButtonAddUser = async (user) => {
    const responseAddUserOnChannel = await axios.post(
      "http://localhost:3000/addUserOnChannel",
      {
        channel: currentChannel,
        name: user,
      }
    );
  };

  return (
    <div className={styles.container}>
      <Search
        array={listAllUsers}
        currentSearch={currentSearch}
        sortedArray={sortedUsers}
        setSortedArray={setSortedUsers}
        color={color}
        placeholder={"введите имя"}
      />
      {sortedUsers.map((user) => {
        const isInChannel = listUsersCurrentChannel.includes(user);
        return (
          <div key={user} className={styles.containerUser}>
            <div className={styles.nameUser}>{user}</div>
            {isInChannel ? (
              <div className={styles.markUserChannel}>пользователь</div>
            ) : (
              <button
                className={styles.buttonAddUser}
                onClick={() => handleClickButtonAddUser(user)}
              >
                <img alt="" src={circleAdd} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
