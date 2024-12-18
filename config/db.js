import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URI || "mongodb+srv://infotech8513:ashish1010@cluster0.219pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

const databaseConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL, {

    });
    console.log(`Connected to DB: ${conn.connection.host}`);
  } catch (err) {
    console.error("Not connected to the database:", err.message);
    process.exit(1);
  }
};

export default databaseConnect;
