import { useSelector } from "react-redux";
import styles from "./FormAddUserOnChannel.module.css";
import circleAdd from "../../../../../Images/CircleAdd.svg"
import axios from "axios";

export function FormAddUserOnChannel() {
  const listAllUsers = useSelector((state) => state.users.listUsers);
  const listUsersCurrentChannel = useSelector(
    (state) => state.informationOfChannels.usersCurrentChannel
  );
  const currentChannel = useSelector((state) => state.informationOfChannels.currentChannel)

  const handleClickButtonAddUser = async (user) => {
    const responseAddUserOnChannel = await axios.post(
      "http://localhost:3000/addUserOnChannel", {
        channel: currentChannel,
        name: user,
      }
    );
  }

  return (
    <div className={styles.container}>
      {listAllUsers.map((user) => {
        const isInChannel = listUsersCurrentChannel.includes(user);
        return (
          <div key={user} className={styles.containerUser}>
            <div className={styles.nameUser}>
              {user}
            </div>
            {isInChannel ? (
              <div className={styles.markUserChannel}>пользователь</div>
            ) : (
              <button className={styles.buttonAddUser} onClick={() => handleClickButtonAddUser(user)}>
                <img alt="" src={circleAdd}/>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
