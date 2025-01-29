import styles from "./ButtonSend.module.css";
import send from "../../../../../Images/Send.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function ButtonSend({ setInputValue }) {
  const author = useSelector((state) => state.user.user);
  const dialedMessage = useSelector(
    (state) => state.dialedMessage.dialedMessage
  );

  const dispatchMessageOnServer = async () => {
    await axios.post("http://localhost:3000/messages", {
      senderId: author[0],
      text: dialedMessage,
      channelName: "general",
    });
  };

  const handleClick = () => {
    dispatchMessageOnServer();
    setInputValue("")
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        dispatchMessageOnServer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <button className={styles.button}>
      <img alt="" src={send} className={styles.image} onClick={handleClick} />
    </button>
  );
}
