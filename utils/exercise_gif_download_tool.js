const axios = require("axios");
const https = require("https");
const fs = require("fs");
require("dotenv").config();

const save_path = "./gifs/";

// API options
const options = {
  method: "GET",
  url: "https://exercisedb.p.rapidapi.com/exercises",
  headers: {
    "X-RapidAPI-Key": process.env.KEY,
    "X-RapidAPI-Host": process.env.HOST,
  },
};

// Rename files to save them
function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '_');
}

// Download gifs in parallel
const downloadGif = (path, url) => {
  const file = fs.createWriteStream(path);
  https.get(url, (res) => {
    res.pipe(file);
    file.on("finish", () => {
      file.close(() => {
        console.log("Image downloaded");
      });
    });
  }).on("error", () => {
    fs.unlink(path, () => {
      console.error("Failed: ", url);
    });
  });
};

// fetch exercise data and download gifs for each
const main = async () => {
  try {
    const response = await axios.request(options);
    const exercises = response.data;
    exercises.forEach((e) => {
      try {
        downloadGif(`${save_path}${removeSpecialCharacters(e.name)}.gif`, e.gifUrl);
        return;
      } catch (e) {
        console.log(e);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

main();
