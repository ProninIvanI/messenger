import styles from './Workspace.module.css'

export function Workspace({children}) {
  return(
    <div className={styles.container}>
      {children}
    </div>
  );
}