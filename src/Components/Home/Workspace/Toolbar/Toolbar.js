import { ButtonSectionToolbar } from '../ButtonSectionToolbar/ButtonSectionToolbar';
import styles from './Toolbar.module.css'
import profile from '../../../../Images/Profile.svg';
import channels from '../../../../Images/Channels.svg';
import createChannel from '../../../../Images/CreateChannel.svg';

export function Toolbar({selectionWorkspace, setSelectionWorkspace}) {
  return(
    <div className={styles.container}>
      <ButtonSectionToolbar image={profile} setSelectionWorkspace={setSelectionWorkspace} selectionName={'profile'} name={selectionWorkspace}/>
      <ButtonSectionToolbar image={channels} setSelectionWorkspace={setSelectionWorkspace} selectionName={'channels'} name={selectionWorkspace}/>
      <ButtonSectionToolbar image={createChannel} setSelectionWorkspace={setSelectionWorkspace} selectionName={'createChannel'} name={selectionWorkspace}/>
    </div>
  );
}