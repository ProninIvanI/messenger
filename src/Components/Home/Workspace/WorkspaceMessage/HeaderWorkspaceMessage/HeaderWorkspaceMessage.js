import { useSelector } from "react-redux";
import styles from "./HeaderWorkspaceMessage.module.css";
import imageExtensionChannelInformation from "../../../../../Images/ExtensionChannel.svg";
import imageAddUser from "../../../../../Images/AddUser.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
import { FormAddUserOnChannel } from "../FormAddUserOnChannel/FormAddUserOnChannel";

export function HeaderWorkspaceMessage({
  setExtensionButton,
  extensionButton,
}) {
  const [focusButtonAddUser, setFocusButtonAddUser] = useState(false);
  const channelName = useSelector(
    (state) => state.informationOfChannels.currentChannel
  );

  const handleClickOnExtensionButton = () => {
    if (extensionButton) {
      setExtensionButton(false);
    } else {
      setExtensionButton(true);
    }
  };

  const outsideClick = () => {
    setFocusButtonAddUser(false);
  }

  const handleClickOnAddUserButton = () => {
    setFocusButtonAddUser(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.channelName}>{channelName}</div>
      <div className={styles.rightPartHeader}>
        <OutsideClickHandler onOutsideClick={outsideClick}>
          <button
            className={styles.button}
            onClick={handleClickOnAddUserButton}
          >
            <img alt="" src={imageAddUser} />
          </button>
          {focusButtonAddUser && <FormAddUserOnChannel/>}
        </OutsideClickHandler>
        <button
          className={styles.button}
          onClick={handleClickOnExtensionButton}
        >
          <img alt="" src={imageExtensionChannelInformation} />
        </button>
      </div>
    </div>
  );
}
