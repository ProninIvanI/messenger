import { FormForMakeChannel } from '../FormForMakeChannel/FormForMakeChannel';
import styles from './WorkspaceCreateChannel.module.css'

export function WorkspaceCreateChannel() {
  return(
    <div className={styles.container}>
      <FormForMakeChannel/>
    </div>
  );
}

