const GroupModel = require("../models/groupSchema");
const { client } = require("../../config");
const { Api } = require("telegram");
const tdl = require("tdl");
const { getTdjson } = require("prebuilt-tdlib");

tdl.configure({ tdjson: getTdjson() });

const apiId = process.env.TELEGRAM_API_ID;
const apiHash = process.env.TELEGRAM_API_HASH;

const tdclient = tdl.createClient({
  apiId: apiId,
  apiHash: apiHash,
});

const tdLoginUser = async () => {
  try {
    await tdclient.connect();
    await tdclient.login();
  } catch (err) {
    res.status(500).json({ error: err });
    throw err;
  }
};

const tdCreateChat = async (req, res) => {
  const {title, latitude, longitude, username, description} = req.body
  try {
    await tdclient.connect();
    await tdclient.login();

    // create supergroup
    const result = await tdclient.invoke({
      _: "createNewSupergroupChat",
      description: description,
      title: title,
      location: {
        _: "chatLocation",
        latitude: latitude,
        longitude: longitude,
      },
    });

    const chatId = result.type.supergroup_id;


    // Set a public username to make the supergroup public
    const setUsernameResult = await tdclient.invoke({
      _: "setSupergroupUsername",
      supergroup_id: chatId,
      username:username, // Choose a unique username
    });


    const privacyResult = await tdclient.invoke({
      _: "toggleSupergroupJoinByRequest",
      supergroup_id: chatId,
      join_by_request: true,
    });


    res.status(200).json({ group: result, privacy: privacyResult, username: setUsernameResult });
  } catch (err) {
    res.status(500).json({ error: err });
    throw err;
  }
};

const tdJoinChatRequest = async (req, res) => {
  const { inviteLink } = req.body;
  try {
    await tdclient.connect();
    await tdclient.login();


    // Send join request
    const joinRequestResult = await tdclient.invoke({
      _: "joinChatByInviteLink",
      invite_link: inviteLink,
    });

    res.status(200).json({ user: user, join: joinRequestResult });
  } catch (err) {
    res.status(err.code).json({ error: err });
    throw err;
  }
};

const tdGetNearbyGroups = async (req, res) => {
  const { latitude, longitude, radius } = req.body;
  try {
    const nearbyChats = await tdclient.invoke({
      _: "searchChatsNearby",
      location: {
        _: "location",
        latitude: latitude,
        longitude: longitude,
      },
      radius: radius,
    });

    const chatIds = nearbyChats.supergroups_nearby.map((chat) => chat.chat_id);
    const chatDetailsPromises = chatIds.map((chatId) =>
      tdclient.invoke({
        _: "getChat",
        chat_id: chatId,
      })
    );

    const chats = await Promise.all(chatDetailsPromises);

    res.status(200).json({ chatIds: chatIds, groups: chats });
  } catch (err) {
    res.status(500).json({ error: err });
    throw err;
  }
};

const bigIntToLong = (bigIntValue) => {
  return Number(bigIntValue);
};

const createGroup = async (req, res) => {
  try {
    await client.connect();

    const data = req.body;
    data.geoPoint =
      data.geoPoint && new Api.InputGeoPoint({ ...data.geoPoint });

    const result = await client.invoke(new Api.channels.CreateChannel(data));
    const accessHash = result.chats[0].accessHash.value;
    const channelId = result.updates[1].channelId.value;

    console.log(accessHash, channelId);

    // Create newGroup with channelId and accessHash
    const newGroup = new GroupModel({ ...data, channelId, accessHash });

    // Save newGroup to the database
    await newGroup.save();

    // Call requestJoin to make the group private
    await requestJoin(channelId, accessHash);

    res.status(200).json(newGroup);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ error: err });
    throw err;
  }
};

const requestJoin = async (channelId, accessHash) => {
  try {
    const result = await client.invoke(
      new Api.channels.ToggleJoinRequest({
        channel: new Api.InputChannel({
          channelId: channelId,
          accessHash: accessHash,
        }),
        enabled: true,
      })
    );
    console.log(result); // prints the result
  } catch (error) {
    console.error("Error requesting join:", error);
    throw error;
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

// Add a user to your chatgroup
// The user must be  a mutual contact to be added to chat
// A mutual contact is a contact that appears in both user's contact list i.e they have saved your(sender's) number and you(sender) has saved theirs
const addChatUser = async (req, res) => {
const {chatId, userId, accessHash} = req.body
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.messages.AddChatUser({
          chatId: chatId,
          userId: new Api.InputUser({
            userId: userId,
            accessHash: accessHash,
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

// Create a group and add yourself in it
// To add more users in the creation process, pass their ids in the users array
const createChat = async (req, res) => {
  const { title } = req.body;
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.messages.CreateChat({
          users: [],
          title: title,
        })
      );
      console.log(result.updates.updates[1].participants.chatId.value);
      console.log(result.updates.chats[1].accessHash.value);

      const accessHash = bigIntToLong(result.updates.chats[1].accessHash.value);
      const channelId = bigIntToLong(
        result.updates.updates[1].participants.chatId.value
      );
      console.log("channel id.........................", channelId);
      console.log("access ###########################", accessHash);

      await requestJoin(channelId, accessHash);

      res.status(200).json(result);
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

// get nearby groups
// This is used to get groups by location
const getNearbyGroups = async (req) => {
  // Extract latitude, longitude, and maxDistance from query parameters
  const { latitude, longitude } = req.query;
  try {
    // Define query pipeline for geospatial query
    const pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            // Coordinates in [longitude, latitude] order
            coordinates: [longitude, latitude],
          },
          // Calculate distance to each group
          distanceField: "distance",
          // Maximum distance in meters
          // Setting it to a hard-coded value to always get groups within 10kn radius
          // Pass it as a query param for a more flexible request eg bigger or smallet distances
          maxDistance: 10000,
          // Use spherical geometry for Earth-like calculations
          spherical: true,
        },
      },
    ];

    // Perform aggregation query
    const nearbyGroups = await GroupModel.aggregate(pipeline);

    return nearbyGroups;
  } catch (error) {
    console.error("Error getting nearby groups:", error);
    throw error;
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
  getNearbyGroups,
  tdCreateChat,
  tdJoinChatRequest,
  tdGetNearbyGroups,
  tdLoginUser,
};
