import { useDispatch } from "react-redux";
import { useWebSocket } from "../../../../../Hooks/WebSocketContext";
import styles from "./ButtonChannel.module.css";
import { loadCurrentChannelInStore } from "../../../../../Store/Slices/InformationOfChannelsSlice";

export function ButtonChannel({ name }) {
  const { socket } = useWebSocket();
  const dispatch = useDispatch()

  const handleClick = async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "getMessages",
          payload: { channelName: name },
        })
      );
    }
    dispatch(loadCurrentChannelInStore(name));
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>{name}</button>
    </div>
  );
}
