import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { news } from "./controllers/news.controller.js";
import route from "./routes/route.js";
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 4001;
const uri = process.env.MongoDBURI;
try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to Mongodb");
} catch (error) {
  console.log("Errors ", error);
}

app.use("/", route);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
