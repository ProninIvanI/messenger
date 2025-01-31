import { useEffect, useState } from "react";
import { Header } from "../../Components/Home/Header/Header";
import { ListChannel } from "../../Components/Home/Workspace/ListChannel/ListChannel/ListChannel";
import { Workspace } from "../../Components/Home/Workspace/Workspace/Workspace";
import { WorkspaceMessage } from "../../Components/Home/Workspace/WorkspaceMessage/WorkspaceMessage/WorkspaceMessage";
import { useWebSocket } from "../../Hooks/WebSocketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChannelsInStore,
  loadChannelsUserInStore,
  loadSortedChannelsUserInStore
} from "../../Store/Slices/InformationOfChannelsSlice";
import axios from "axios";
import { Toolbar } from "../../Components/Home/Workspace/Toolbar/Toolbar";
import { WorkspaceProfile } from "../../Components/Home/Workspace/WorkspaceProfile/WorkspaceProfile/WorkspaceProfile";
import { WorkspaceCreateChannel } from "../../Components/Home/Workspace/WorkspaceCreateChannel/WorkspaceCreateChannel/WorkspaceCreateChannel";
import { loadListFilterUsers, loadListUsers } from "../../Store/Slices/UsersSlice";

export function HomePage() {
  const dispatch = useDispatch();
  const [selectionWorkspace, setSelectionWorkspace] = useState("channels");
  const user = useSelector((state) => state.user.user)
  const { init } = useWebSocket();
  const initHomePage = async () => {
    const responseListChannel = await axios.get(
      "http://localhost:3000/channels"
    );
    dispatch(loadChannelsInStore(responseListChannel.data));
    const responseListChannelsUser = await axios.get(
      `http://localhost:3000/userChannels/${user}`
    );
    dispatch(loadChannelsUserInStore(responseListChannelsUser.data))
    dispatch(loadSortedChannelsUserInStore(responseListChannelsUser.data))
    const responseListAllUsers = await axios.get(
      `http://localhost:3000/usersMessenger?name=${user}`
    );
    dispatch(loadListUsers(responseListAllUsers.data));
    dispatch(loadListFilterUsers(responseListAllUsers.data));
  };

  useEffect(() => {
    initHomePage();
    init();
  }, []);

  return (
    <div>
      <Header />
      <Workspace>
        <Toolbar
          selectionWorkspace={selectionWorkspace}
          setSelectionWorkspace={setSelectionWorkspace}
        />
        {selectionWorkspace === "profile" && (
          <>
            <WorkspaceProfile />
          </>
        )}
        {selectionWorkspace === "channels" && (
          <>
            <ListChannel />
            <WorkspaceMessage />
          </>
        )}
        {selectionWorkspace === "createChannel" && (
          <>
            <WorkspaceCreateChannel />
          </>
        )}
      </Workspace>
    </div>
  );
}
