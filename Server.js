import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

//  connect to DataBase
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.info("MongoDB Connected");
  app.listen(PORT, () => {
    console.info(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error("❌ DB connection error:", err));
