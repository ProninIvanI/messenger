const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://messenger-9e481-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.database();

app.use(
  cors({
    origin: "*", // Allow requests from any origin (only for development)
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

const WebSocket = require("ws");

const server = app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    const data = JSON.parse(message);

    if (data.type === "getMessages") {
      const { channelName } = data.payload;
      const channelsRef = db.ref("channels");
      const snapshot = await channelsRef.once("value");

      let foundChannel = null;

      if (snapshot.val()) {
        foundChannel = snapshot.val()[channelName]; // Получаем канал по имени
      }

      if (!foundChannel) {
        ws.send(JSON.stringify({ error: "Channel not found" }));
        return;
      }

      const messages = [];

      if (foundChannel.messages) {
        Object.keys(foundChannel.messages).forEach((key) => {
          const message = foundChannel.messages[key];
          messages.push({
            messageId: key,
            author: message.author,
            content: message.content,
            timestamp: message.timestamp,
          });
        });
      }

      ws.send(JSON.stringify({ type: "messagesFetched", payload: messages }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Create user
app.post("/users", async (req, res) => {
  const { login } = req.body;
  const userRef = db.ref(`users/${login}`);
  await userRef.set("");
  res.send({ login });
});

// Search users
app.get("/users", async (req, res) => {
  const { query } = req.query;
  const usersRef = db.ref("users");
  const snapshot = await usersRef.once("value");
  const users = [];
  snapshot.forEach((child) => {
    if (child.key.includes(query)) {
      users.push(child.key);
    }
  });
  res.send(users);
});

app.post("/messages", async (req, res) => {
  const { senderId, text, channelName } = req.body;
  const channelsRef = db.ref(`channels`);
  const snapshot = await channelsRef.once("value");
  const channels = snapshot.val();
  const channel = Object.values(channels).find(
    (channel) => channel.name === channelName
  );

  if (!channel) {
    return res.status(404).send({ error: "Channel not found" });
  }
  const message = {
    author: senderId,
    content: text,
    timestamp: Date.now(),
  };

  const messagesRef = channelsRef.child(channelName).child("messages").push();
  await messagesRef.set(message);

  // Notify all connected clients about the new message
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "newMessage",
          payload: { messageId: messagesRef.key, ...message },
        })
      );
    }
  });

  res.send({ messageId: messagesRef.key });
});

// Get all channels
app.get("/channels", async (req, res) => {
  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.once("value");
  const channelNames = [];
  snapshot.forEach((child) => {
    channelNames.push(child.val().name );
  });
  res.send(channelNames);
});

app.get("/userChannels/:login", async (req, res) => {
  const { login } = req.params;
  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.once("value");

  const userChannels = [];

  snapshot.forEach((child) => {
    const channel = child.val();
    if (channel.members && channel.members.includes(login)) {
      userChannels.push(channel.name );
    }
  });

  res.send(userChannels);
});

app.get("/adminCurrentChannel", async (req, res) => {
  const channelName = req.query.name;
  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.once("value");

  let admin = "";

  snapshot.forEach((child) => {
    const channel = child.val();
    if (channel.name === channelName) {
      admin = channel.creator;
    }
  });

  res.send(admin);
});

app.get("/usersCurrentChannel", async (req, res) => {
  const channelName = req.query.name;
  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.once("value");

  const users = [];

  snapshot.forEach((child) => {
    const channel = child.val();
    if (channel.name === channelName) {
      users.push(...channel.members);
    }
  });

  res.send(users);
});

app.get("/usersMessenger", async (req, res) => {
  const nameCurrentUser = req.query.name;
  const usersRef = db.ref("users");
  const snapshot = await usersRef.once("value");

  const users = [];

  snapshot.forEach((child) => {
    const user = child.val();
    if (nameCurrentUser !== user.username) {
      users.push(user.username);
    }
  });

  res.send(users);
});

app.post("/addUserOnChannel", async (req, res) => {
  const { channel, name } = req.body;
  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.once("value");

  snapshot.forEach((child) => {
    const channelData = child.val();

    if (channelData.name === channel) {
      if (!channelData.members.includes(name)) {
        channelData.members.push(name);
        channelsRef.child(child.key).update({ members: channelData.members });
        const message = JSON.stringify({
          type: "addedUserOnChannel",
          payload: channelData.members,
        });

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
        return res
          .status(200)
          .send({ message: "User added to channel successfully." });
      } else {
        return res
          .status(400)
          .send({ message: "User is already in the channel." });
      }
    }
  });
});

app.post("/deleteUserWithChannel", async (req, res) => {
  const { channel, name } = req.body;
  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.once("value");

  snapshot.forEach((child) => {
    const channelData = child.val();
    if (channelData.name === channel) {
      const memberIndex = channelData.members.indexOf(name);
      if (memberIndex > -1) {
        channelData.members.splice(memberIndex, 1);
        channelsRef.child(child.key).update({ members: channelData.members });
        const message = JSON.stringify({
          type: "removedUserFromChannel",
          payload: channelData.members,
        });

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
        return res
          .status(200)
          .send({ message: "User removed from channel successfully." });
      } else {
        return res
          .status(400)
          .send({ message: "User not found in the channel." });
      }
    }
  });
});

app.post("/channels", async (req, res) => {
  const { channelName, creator } = req.body;
  if (!channelName || !creator) {
    return res
      .status(400)
      .send({ error: "Channel name and creator are required" });
  }

  const channelsRef = db.ref("channels");
  const snapshot = await channelsRef.child(channelName).once("value");

  if (snapshot.exists()) {
    return res.status(400).send({ error: "Channel already exists" });
  }

  const newChannel = {
    creator: creator,
    members: [creator],
    messages: [],
    name: channelName,
  };

  await channelsRef.child(channelName).set(newChannel);

  // Уведомляем всех подключенных клиентов о новом канале
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "newChannel",
          payload: newChannel,
        })
      );
    }
  });

  res.send({ message: "Channel created successfully", channel: newChannel });
});
