const express = require("express");
const cookierParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();
app.use(cookierParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Muji started");
});

app.use("/api/auth", authRoutes);

module.exports = app;
