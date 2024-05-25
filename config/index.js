require("dotenv").config();
const { TelegramClient } = require("telegram");
const StringSession = require("telegram/sessions").StringSession;
const path = require("path");
const fs = require("fs");

const apiId = process.env.TELEGRAM_API_ID;
const apiHash = process.env.TELEGRAM_API_HASH;

// let stringSession = new StringSession(
//   "1BAAOMTQ5LjE1NC4xNjcuOTEAUK0Fyma4f/A+9dmkRxiFp0CzGuWsxHMeQ+lqyOovXOdlCQ/l7EZr4P3WodYz02KhkBOyMWX7iS2juVG+qDy8Ng9WboM5ZpHMEj6fZHCNrXzLQqjvdqLD1utmt7tN/KkqLp4oHXzi5jAk2VsC/xIwlVpm90PEYU45WufFFJVEJfWttQ3q5gq/lBM5G2X1GqLxIdqOHGVpn9J9FfP277VJIdNjx+Ir3wdAQFd493FFfzO13sfFo+KexV7jpFh1yFF3LEEdJzS7YnnYB44KAti0gaFclViE0ESc09poIb2gI+inKc1QDIDqZlvmTUro7cTYxMsNnLCqoY8V8q007IRlWJg="
// );
const filePath = path.join("", "example.txt");

// const data = fs.readFileSync(filePath, "utf8");

//   "1BAAOMTQ5LjE1NC4xNjcuOTEAUHi6J3p3aLU1lT3tDJyB5ppijSr9AwA6HcXux05OWk5br84weZb9/k8RmqsQiN5mNbU7wxGMr6JaiM45xltsBVMoCJa8f7PNS4WrZCsv/8YSFO/H241q0sPb1eayzqAU3MQK8z50xUMWO03D8KF1bC2tD5VccCrDJ5qQqaypXUDP0QdZTI7tpYGckLhK/ETdnwuuXBWxXkn7Fxx/q2WPE6jM5ie6B9pOYK362NQHcFFj1Jf3wbSUCy/byohEccnDZldKqxUFEsefTMl7SDsuCsc6cbCJkr2w52E/d1zIXwKE3T3t0raAY/i+elyFBjzijXRMAkYJ8P+il+LtNjI6bjU=";

const data ="1BAAOMTQ5LjE1NC4xNjcuOTEAUIgIV/gOIuO3F+MxkKW5e7Hq4NVoSXH3lV7dmFxci0g7vb27KO0pBmhbkI1QMj7tR7nQVfTAbUtm51cT32Yv2qaeMQGK0a4WPEIAVWKkg6cWMFo+Kz3K5HQOu3VTmLxfbJEaW2agiMbT2u/x2B/0kY4znp3O+YyS2073EIDzlGnTA3x0lgTtBkoT1rpXevqa5G2Ni9t9pijoNOI0GHIQaRrq7/Mnghu5sxN9/NtuwYl8AePhExD/xNv+hj6CnblQtdPuIbze0G4AZY06I+ygs+8ER00B541zLSYKYUEQCTHDQ68gDWExjT1ZAgucidZXEOBSXD1tU9impN1CRnX53A8="
// console.log(data, "data2");

let stringSession = new StringSession(data);
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});


module.exports = {
  port: process.env.PORT || 5000,
  mongoURI:
    process.env.MONGODB_URI,
  client,
};

require("dotenv").config();
