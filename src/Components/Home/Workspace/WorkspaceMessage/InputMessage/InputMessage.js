import styles from "./InputMessage.module.css";
import { useDispatch } from "react-redux";
import { loadDialedMessageInStore } from "../../../../../Store/Slices/DialedMessageSlice";

export function InputMessage({ inputValue, setInputValue }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputValue(e.target.value)
    dispatch(loadDialedMessageInStore(e.target.value));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Написать сообщение..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setInputValue("");
          }
        }}
      />
    </div>
  );
}
