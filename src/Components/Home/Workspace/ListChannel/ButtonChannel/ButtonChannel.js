import { useDispatch } from "react-redux";
import { useWebSocket } from "../../../../../Hooks/WebSocketContext";
import styles from "./ButtonChannel.module.css";
import { loadAdminCurrentChannel, loadCurrentChannelInStore, loadUsersCurrentChannelInStore } from "../../../../../Store/Slices/InformationOfChannelsSlice";
import axios from "axios";

export function ButtonChannel({ name }) {
  const { socket } = useWebSocket();
  const dispatch = useDispatch()

  const loadUsers = async () => {
    const responseLoadUsers = await axios.get(`http://localhost:3000/usersCurrentChannel?name=${name}`);
    dispatch(loadUsersCurrentChannelInStore(responseLoadUsers.data))
  }

  const loadAdmin = async () => {
    const responseLoadAdmin = await axios.get(`http://localhost:3000/adminCurrentChannel?name=${name}`)
    dispatch(loadAdminCurrentChannel(responseLoadAdmin.data))
  }

  const handleClick = async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "getMessages",
          payload: { channelName: name },
        })
      );
    }
    loadUsers();
    loadAdmin();
    dispatch(loadCurrentChannelInStore(name));
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>{name}</button>
    </div>
  );
}
