const UserModel = require("../models/authSchema");
const { Api } = require("telegram");
const StringSession = require("telegram/sessions").StringSession;
const input = require("input");
const fs = require("fs");
const { client } = require("../../config");

const getTelegramLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;

  (async function run() {
    await client.connect();
    const result = await client.invoke(
      new Api.auth.SendCode({
        phoneNumber: phoneNumber,
        password: password,
        apiId: client.apiId,
        apiHash: client.apiHash,
        settings: new Api.CodeSettings({}),
      })
    );
    console.log(result);
    return result.phoneCodeHash;
  })();
};

const getTelegramOtp = async (req, res) => {
  console.log(req.body);
  const { code, phoneNumber, phoneCodeHash, password } = req.body;
  try {
    (async function run() {
      await client.connect();
      //get the phone code
      const result = await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phoneNumber,
          phoneCodeHash: phoneCodeHash,
          phoneCode: code,
          password: password,
        })
      );
      console.log(result);
      const user = await client.getMe();
      const token = client.session.save();
      const newUser = new UserModel({
        token,
        accessHash: user.accessHash,
        userId: user.id,
        username: user.username,
        phone: user.phone,
      });

      // Save newGroup to the database
      await newUser.save();

      res.status(200).json(newGroup);
    })();
  } catch (error) {
    console.log(error);
  }
};

const resendCode = async (req, res) => {
  console.log(req.body);
  const { code, phoneNumber } = req.body;
  console.log(code);
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.auth.ResendCode({
          phoneNumber: req.body.phoneNumber,
          phoneCodeHash: "4bcd57bc6d8be77b19",
        })
      );
      console.log(result);
    })();
  } catch (error) {
    console.log(error);
  }
};

const serversideLogin = async (req, res) => {
  (async () => {
    await client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");

    //get userId
    const user = await client.getMe();
      const token = client.session.save();
      const newUser = new UserModel({
        token,
        accessHash: user.accessHash,
        userId: user.id,
        username: user.username,
        phone: user.phone,
      });

      // Save newGroup to the database
      await newUser.save();

      res.status(200).json(newUser);
  })();
};

module.exports = {
  getTelegramLogin,
  getTelegramOtp,
  serversideLogin,
  resendCode,
};
