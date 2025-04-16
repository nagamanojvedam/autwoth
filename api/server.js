const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB server"));

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port:${process.env.PORT}...`);
});
