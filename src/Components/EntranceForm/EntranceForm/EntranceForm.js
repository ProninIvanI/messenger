import styles from "./EntranceForm.module.css";
import logo from "../../../Images/Logo.png";
import lettersLogo from "../../../Images/LettersLogo.png";
import { LoginForm } from "../LoginForm/LoginForm";

export function EntranceForm() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img alt="" src={logo} className={styles.logoImage} />
            <img alt="" src={lettersLogo} className={styles.lettersLogoImage} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
               styles.buttonHover
            }`}
          >
            <div
              className={`${styles.textButton} ${
                styles.textButtonHover
              }`}
            >
              Войти
            </div>
          </button>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
