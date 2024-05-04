const fs = require("fs");

// Text content to write to the file
const updateStr = (filePath, textContent) => {
  fs.writeFile(filePath, textContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Text content written to file successfully.");
    }
  });
};

const readFileContent = async (filePath) => {
  try {
    // Read the file asynchronously and wait for the result
    const data = await fs.readFile(filePath, "utf8");
    return data; // Return the data if successful
  } catch (err) {
    console.error("Error reading file:", err);
    throw err; // Throw the error to the caller
  }
};

module.exports = { updateStr, readFileContent };
