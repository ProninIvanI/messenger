import { useState } from "react";
import { AreaInputMessage } from "../AreaInputMessage/AreaInputMessage";
import { AreaVisionMessage } from "../AreaVisionMessage/AreaVisionMessage";
import { HeaderWorkspaceMessage } from "../HeaderWorkspaceMessage/HeaderWorkspaceMessage";
import styles from "./WorkspaceMessage.module.css";
import { ExtensionChannelInformation } from "../ExtensionChannelInformation/ExtensionChannelInformation";
import { useSelector } from "react-redux";

export function WorkspaceMessage() {
  const [extensionButton, setExtensionButton] = useState(false);
  const currentChannel = useSelector(
    (state) => state.informationOfChannels.currentChannel
  );
  return (
    <div className={styles.container}>
      {currentChannel ? (
        <>
          <HeaderWorkspaceMessage
            setExtensionButton={setExtensionButton}
            extensionButton={extensionButton}
          />
          <div className={styles.bodyWorkspaceMessage}>
            <div className={styles.workspaceMessage}>
              <AreaVisionMessage />
              <AreaInputMessage />
            </div>
            {extensionButton && <ExtensionChannelInformation />}
          </div>
        </>
      ) : (
        <div className={styles.formChannelNotSelected}>
          <div className={styles.wrapperMessage}>Выберите канал для общения</div>
        </div>
      )}
    </div>
  );
}
