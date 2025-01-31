import { useSelector } from 'react-redux';
import styles from './ListChannel.module.css'
import { ButtonChannel } from '../ButtonChannel/ButtonChannel';
import { Search } from '../../WorkspaceMessage/Search/Search/Search';
import { useState } from 'react';

export function ListChannel() {
  const channels = useSelector((state) => state.informationOfChannels.channelsUser)
  const [sortedChannels, setSortedChannels] = useState(useSelector((state) => state.informationOfChannels.sortedChannelsUser));
  const currentSearch = useSelector((state) => state.search.searchChannel)
  return(
    <div className={styles.container}>
      <Search
        array={channels}
        currentSearch={currentSearch}
        sortedArray={sortedChannels}
        setSortedArray={setSortedChannels}
        placeholder={"введите название"}
        styleContainer={styles.containerSearch}
      />
      {sortedChannels && sortedChannels.map((channel) => (
        <ButtonChannel key={channel} name={channel}/>
      ))}
    </div>
  );
}