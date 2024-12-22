import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("You are connected to MongoDB sucessfully");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}

async function mongoConnect() {
  try {
    console.log(
      "Connecting to MongoDB type of uri",
      typeof process.env.MONGO_URL
    );
    await mongoose.connect(`mongodb+srv://bubun:bubun@cluster0.lblx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { connectToDB, mongoConnect, mongoDisconnect };
