require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors")
const userRouter = require("./routes/userRouter")

//middleware
app.use(express.json());
app.use(cors())

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Mb Events Server" });
});
app.use("/api/v1", userRouter)
//error route
app.use((req, res) => {
  res.status(401).json({ success: false, message: "Route Not Found" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "mbevents",
    });
    app.listen(PORT, () => {
      console.log(`server listening on port:  ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
