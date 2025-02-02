import styles from './ContainerWorkspace.module.css'

export function ContainerWorkspace({children}) {
  return(
    <div className={styles.container}>
      {children}
    </div>
  );
}