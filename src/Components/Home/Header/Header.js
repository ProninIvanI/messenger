import styles from './Header.module.css'
import logo from '../../../Images/Logo.png'
import lettersLogo from '../../../Images/LettersLogo.png'

export function Header() {
  return(
    <div className={styles.container}>
      <img alt='' src={logo} className={styles.logo}/>
      <img alt='' src={lettersLogo} className={styles.lettersLogo}/>
    </div>
  );
}