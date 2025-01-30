import { useSelector } from "react-redux";
import styles from "./ExtensionChannelInformation.module.css";
import userDelete from "../../../../../Images/PersonDelete.svg";
import axios from "axios";

export function ExtensionChannelInformation({ nameCurrentChannel }) {
  const usersChannel = useSelector(
    (state) => state.informationOfChannels.usersCurrentChannel
  );
  const currentUser = useSelector((state) => state.user.user[0]);
  const adminCurrentChannel = useSelector(
    (state) => state.informationOfChannels.adminCurrentChannel
  );

  const handleClickButtonDeleteUser = async (user) => {
    const responseAddUserOnChannel = await axios.post(
      "http://localhost:3000/deleteUserWithChannel",
      {
        channel: nameCurrentChannel,
        name: user,
      }
    );
  };

  return (
    <div className={styles.extensionChannelInformation}>
      <div className={styles.headerInformationChannel}>information channel</div>
      {usersChannel.map((user) => {
        return (
          <div key={user} className={styles.containerUser}>
            <div className={styles.nameUser}>{user}</div>
            {adminCurrentChannel === user ? (
              <div className={styles.markAdmin}>админ</div>
            ) : (
              currentUser === adminCurrentChannel && (
                <button
                  className={styles.buttonDeleteUser}
                  onClick={() => handleClickButtonDeleteUser(user)}
                >
                  <img alt="" src={userDelete} />
                </button>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
