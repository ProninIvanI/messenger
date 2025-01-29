import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, loadMessageInStore } from "../Store/Slices/MessagesSlice";
import { addChannel } from "../Store/Slices/InformationOfChannelsSlice";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const currentChannel = useSelector(
    (state) => state.informationOfChannels.currentChannel
  );

  const init = () => {
    const newSocket = new WebSocket("ws://localhost:3000");
    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      console.log("Connected to the WebSocket server");
      if (currentChannel !== null) {
        newSocket.send(
          JSON.stringify({
            type: "getMessages",
            payload: { channelName: currentChannel },
          })
        );
      }
    });

    newSocket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "messagesFetched") {
        dispatch(loadMessageInStore(data.payload));
      } else if (data.type === "newChannel") {
        dispatch(addChannel(data.payload));
      } else if (data.type === "newMessage") {
        dispatch(addMessage(data.payload));
      } else if (data.error) {
        console.error(data.error);
      }
    });
  };

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, init }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
