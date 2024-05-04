require("dotenv").config();
const { TelegramClient } = require("telegram");
const StringSession = require("telegram/sessions").StringSession;
const path = require("path");
const fs = require("fs");

const apiId = 25939296;
const apiHash = "2d3f19af9d061574732e83b6d260cd07";

// let stringSession = new StringSession(
//   "1BAAOMTQ5LjE1NC4xNjcuOTEAUK0Fyma4f/A+9dmkRxiFp0CzGuWsxHMeQ+lqyOovXOdlCQ/l7EZr4P3WodYz02KhkBOyMWX7iS2juVG+qDy8Ng9WboM5ZpHMEj6fZHCNrXzLQqjvdqLD1utmt7tN/KkqLp4oHXzi5jAk2VsC/xIwlVpm90PEYU45WufFFJVEJfWttQ3q5gq/lBM5G2X1GqLxIdqOHGVpn9J9FfP277VJIdNjx+Ir3wdAQFd493FFfzO13sfFo+KexV7jpFh1yFF3LEEdJzS7YnnYB44KAti0gaFclViE0ESc09poIb2gI+inKc1QDIDqZlvmTUro7cTYxMsNnLCqoY8V8q007IRlWJg="
// );
const filePath = path.join("", "example.txt");

// const data = fs.readFileSync(filePath, "utf8");

//   "1BAAOMTQ5LjE1NC4xNjcuOTEAUHi6J3p3aLU1lT3tDJyB5ppijSr9AwA6HcXux05OWk5br84weZb9/k8RmqsQiN5mNbU7wxGMr6JaiM45xltsBVMoCJa8f7PNS4WrZCsv/8YSFO/H241q0sPb1eayzqAU3MQK8z50xUMWO03D8KF1bC2tD5VccCrDJ5qQqaypXUDP0QdZTI7tpYGckLhK/ETdnwuuXBWxXkn7Fxx/q2WPE6jM5ie6B9pOYK362NQHcFFj1Jf3wbSUCy/byohEccnDZldKqxUFEsefTMl7SDsuCsc6cbCJkr2w52E/d1zIXwKE3T3t0raAY/i+elyFBjzijXRMAkYJ8P+il+LtNjI6bjU=";

const data =""
// console.log(data, "data2");

let stringSession = new StringSession(data);
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

// console.log(stringSession, "old session");  

module.exports = {
  port: process.env.PORT || 5001,
  mongoURI:
    process.env.MONGODB_URI ||
    "mongodb+srv://gloria:Gloria123@cluster0.11p1tki.mongodb.net/",
  client,
};

require("dotenv").config();
