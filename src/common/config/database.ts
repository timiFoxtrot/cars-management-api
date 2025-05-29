import mongoose from "mongoose";
import { config } from ".";

async function connect() {
  try {
    console.log("Db trying to connect");
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("Could not connect to db", error);
    process.exit(1);
  }
}

export default connect;
