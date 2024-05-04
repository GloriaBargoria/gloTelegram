const GroupModel = require("../models/groupSchema");
const { client } = require("../../config");
const { Api } = require("telegram");

const createGroup = async (req, res) => {
  try {
    await client.connect();

    const data = req.body;
    data.geoPoint =
      data.geoPoint && new Api.InputGeoPoint({ ...data.geoPoint });

    const result = await client.invoke(new Api.channels.CreateChannel(data));
    const accessHash = result.chats[0].accessHash.value;
    const channelId = result.updates[1].channelId.value;
    console.log(
      result.chats[0].accessHash.value,
      result.updates[1].channelId.value
    );

    // Create newGroup with channelId and accessHash
    const newGroup = new GroupModel({ ...data, channelId, accessHash });

    // Save newGroup to the database
    await newGroup.save();

    res.status(200).json(newGroup);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ error: err });
    throw err;
  }
};

const joinChannel = async (req, res) => {
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.channels.JoinChannel({
          channel: new Api.InputChannel({
            channelId: 2140435584,
            accessHash: -7697475128525692911n,
          }),
        })
      );
      console.log(result); // prints the result
    })();
  } catch (error) {
    console.log(error);
  }
};

const addChatUser = async (req, res) => {
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.messages.AddChatUser({
          chatId: 4264431115n,
          userId: new Api.InputUser({
            userId: 820499093n,
            accessHash: -8674062871998001741n,
          }),
          fwdLimit: 9717987,
        })
      );
      console.log(result); // prints the result
    })();
  } catch (error) {
    console.log(error);
  }
};

//6626480698641016735n   2049370604n
// -7697475128525692911n
// Integer { value: 2140435584n }

const createChat = async (req, res) => {
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.messages.CreateChat({
          users: [],
          title: "Another test group",
        })
      );
      console.log(result.updates.chatId);
      console.log(result.updates.chats);
    })();
  } catch (error) {
    console.log(error);
  }
};

// get all groups from DB
const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.find();

    res.status(200).json(groups);
  } catch (error) {
    console.error("Error getting groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get group by channel id from DB
const getGroupById = async (req, res) => {
  const { channelId } = req.params;
  try {
    const group = await GroupModel.findOne({ channelId });
    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ error: "Group not found" });
    }
  } catch (error) {
    console.error("Error getting group by channelId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createGroup,
  joinChannel,
  addChatUser,
  createChat,
  getAllGroups,
  getGroupById,
};
