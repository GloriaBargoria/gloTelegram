const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  broadcast: {
    type: Boolean,
  },
  megagroup: {
    type: Boolean,
  },
  join_requests: {
    type: Boolean,
  },
  request_needed: {
    type: Boolean,
  },
  has_geo: {
    type: Boolean,
  },
  public: {
    type: Boolean,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  about: {
    type: String,
  },
  channelId: {
    type: String,
  },
  accessHash: {
    type: String,
  },
  geoPoint: {
    type: {
      lat: { type: Number },
      long: { type: Number },
      accuracyRadius: { type: Number },
      flags: {
        type: Boolean,
      },
    },
    // required: true
  },
});

const GroupModel = mongoose.model("Group", groupSchema);

module.exports = GroupModel;
