import { useState } from 'react';
import { ButtonSend } from '../ButtonSend/ButtonSend';
import { InputMessage } from '../InputMessage/InputMessage';
import styles from './AreaInputMessage.module.css'

export function AreaInputMessage() {
  const [inputValue, setInputValue] = useState("");

  return(
    <div className={styles.container}>
      <InputMessage inputValue={inputValue} setInputValue={setInputValue} />
      <ButtonSend setInputValue={setInputValue} />
    </div>
  );
}