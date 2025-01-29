import styles from './ButtonSectionToolbar.module.css'

export function ButtonSectionToolbar({image, setSelectionWorkspace, selectionName, name}) {
  const handleClick = () => {
    setSelectionWorkspace(selectionName);
  }

  return(
    <button className={`${styles.button} ${name === selectionName ? styles.selectButton : ''}`} onClick={handleClick}>
      <img alt='' src={image} className={styles.image}/>
    </button>
  );
}