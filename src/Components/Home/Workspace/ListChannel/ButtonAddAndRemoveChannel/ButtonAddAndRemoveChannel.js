import styles from "./ButtonAddAndRemoveChannel.module.css";
import imageAdd from "../../../../../Images/Add.svg";
import imageDelete from "../../../../../Images/Delete.svg";
import axios from "axios";
import { useSelector } from "react-redux";

export function ButtonAddAndRemoveChannel({ name, isUser }) {
  const user = useSelector((state) => state.user.user[0]);

  const handleClickAddChannel = async () => {
    const responseAddChannel = await axios.post(
      "http://localhost:3000/addChannel",
      {
        user: user,
        channel: name,
      }
    );
  };

   const handleClickDeleteChannel = async () => {
    const responseDeleteChannel = await axios.post(
      "http://localhost:3000/deleteChannel",
      {
        user: user,
        channel: name,
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerUnderButton}>
        <div className={styles.name}>{name}</div>
        {isUser ? (
          <button className={styles.button} onClick={handleClickAddChannel}>
            <img alt="" src={imageAdd} />
          </button>
        ) : (
          <button className={styles.button} onClick={handleClickDeleteChannel}>
            <img alt="" src={imageDelete} />
          </button>
        )}
      </div>
    </div>
  );
}
