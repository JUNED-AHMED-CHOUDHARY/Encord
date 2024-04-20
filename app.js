import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db/connect.js";
import router from "./routes/index.js";
import notFound from "./middleware/not-found.js";

dotenv.config();

const app = express();

const start = async () => {
  try {
    await connectDB();
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/tasks", router);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

start();
