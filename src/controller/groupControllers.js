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

// Add a user to your chatgroup
// The user must be  a mutual contact to be added to chat
// A mutual contact is a contact that appears in both user's contact list i.e they have saved your(sender's) number and you(sender) has saved theirs
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


// Create a group and add yourself in it
// To add more users in the creation process, pass their ids in the users array
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
            type: 'Point',
            // Coordinates in [longitude, latitude] order
            coordinates: [longitude, latitude] 
          },
          // Calculate distance to each group
          distanceField: 'distance',
          // Maximum distance in meters
          // Setting it to a hard-coded value to always get groups within 10kn radius
          // Pass it as a query param for a more flexible request eg bigger or smallet distances
          maxDistance: 10000, 
          // Use spherical geometry for Earth-like calculations
          spherical: true 
        }
      }
    ];

    // Perform aggregation query
    const nearbyGroups = await GroupModel.aggregate(pipeline);

    return nearbyGroups;
  } catch (error) {
    console.error('Error getting nearby groups:', error);
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
  getNearbyGroups
};
