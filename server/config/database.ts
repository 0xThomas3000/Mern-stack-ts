import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

mongoose.connect(`${URI}`, (err) => {
  if (err) throw err;
  console.log("Database 'blogdev' has been connected successfully !");
});
