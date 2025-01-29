import styles from './FormForMakeChannel.module.css'
import image from '../../../../../Images/CreateChannel.svg'
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export function FormForMakeChannel() {
  const [inputValue, setInputValue] = useState("");
  const creator = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }
  const createChannel = async (channelName, creator) => {
    try {
      const responseCreateChannel = await axios.post('http://localhost:3000/channels', {
        channelName,
        creator
      });
      console.log(responseCreateChannel.data);
    } catch (error) {
      console.error('Error creating channel:', error.response ? error.response.data : error.message);
    }
  }


  const handleClick = () => {
    createChannel(inputValue, creator[0])
    setInputValue("")
  }

  return(
    <div className={styles.container}>
      <div className={styles.containerUnderImage}>
        <img alt='' src={image} className={styles.image}/>
      </div>
      <div className={styles.containerInput}>
        <input value={inputValue} onChange={handleChange} className={styles.input} placeholder='введите название'/>
      </div>
      <button className={styles.button} onClick={handleClick}>создвать канал</button>
    </div>
  );
}

