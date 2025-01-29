import styles from "./Message.module.css";
import { useSelector } from "react-redux";

export function Message({ author, content, timestamp }) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();

  const user = useSelector((state) => state.user.user);
  
  return (
    <div
      className={`${styles.container} ${
        user[0] === author ? styles.position : ""
      }`}
    >
      <div className={`${styles.containerMessage}`}>
        <div className={styles.content}>{content}</div>
        <div className={styles.information}>
          <div className={`${styles.informationText}`}>{author}</div>
          <div className={`${styles.informationText}`}>{formattedDate}</div>
        </div>
      </div>
    </div>
  );
}
