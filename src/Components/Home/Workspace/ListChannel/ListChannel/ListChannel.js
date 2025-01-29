import { useSelector } from 'react-redux';
import styles from './ListChannel.module.css'
import { ButtonChannel } from '../ButtonChannel/ButtonChannel';

export function ListChannel() {
  const channels = useSelector((state) => state.informationOfChannels.channelsUser)

  return(
    <div className={styles.container}>
      {channels && channels.map((channel) => (
        <ButtonChannel key={channel.name} name={channel.name}/>
      ))}
    </div>
  );
}