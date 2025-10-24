// testMongo.js
import mongoose from "mongoose";

const uri = "mongodb+srv://iamjayant246:Jayant123@vibe-fi.8hezqqk.mongodb.net/?appName=vibe-fi";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected successfully!");
    process.exit(0);
  })
  .catch(e => {
    console.error("❌ Connection error:", e.message);
    process.exit(1);
  });
