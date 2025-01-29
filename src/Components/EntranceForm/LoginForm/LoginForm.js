import { useState } from "react";
import { ButtonAcceptForm } from "../ButtonAcceptForm/ButtonAcceptForm";
import { FieldForInput } from "../FieldForInput/FieldForInput";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccessAddUserName } from "../../../Store/Slices/UserSlice";

export function LoginForm() {
  const [login, setLogin] = useState("");
  const isDisabled = login === "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseLogin = await axios.get("http://localhost:3000/users", {
        params: { query: login },
      });
      dispatch(loginSuccessAddUserName(responseLogin.data));

      navigate("/Home");
    } catch (error) {}
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <FieldForInput
        signField={"Логин"}
        type={"text"}
        login={login}
        setLogin={setLogin}
      />
      <ButtonAcceptForm
        type={"submit"}
        text={"Войти"}
        isDisabled={isDisabled}
      />
    </form>
  );
}
