import { useSelector } from 'react-redux';
import styles from './HeaderWorkspaceMessage.module.css'
import imageExtensionChannelInformation from "../../../../../Images/ExtensionChannel.svg"

export function HeaderWorkspaceMessage({ setExtensionButton, extensionButton }) {
  const channelName = useSelector((state) => state.informationOfChannels.dialedChannel)
  
  const handleClick = () => {
    if (extensionButton) {
      setExtensionButton(false)
    } else {
      setExtensionButton(true)
    }
  }

  return(
    <div className={styles.header}>
      <div className={styles.channelName}>{channelName}</div>
      <button className={styles.button} onClick={handleClick}>
        <img alt='' src={imageExtensionChannelInformation}/>
      </button>
    </div>
  );
}