import { useSelector } from "react-redux";
import styles from "./AreaVisionMessage.module.css";
import { Message } from "../Message/Message";
import { useEffect, useRef } from "react";

export function AreaVisionMessage() {
  const messages = useSelector((state) => state.messages.messages);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  return (
    <div className={styles.container}>
      <div className={styles.containerAreaVisionMessage}>
        {messages.map((message) => (
          <Message
            key={message.messageId}
            author={message.author}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={endOfMessagesRef}/>
      </div>
      <div className={styles.marginBlock}/>
    </div>
  );
}
