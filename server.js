const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("./databaseConfig");
const app = express();
app.use(cors());
dbConnection();
app.use(express.json());
app.use(express.static("public"));

app.use("/prensa", require("./routes/prensa"));
app.use("/login", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log("server iniciado en puerto ", PORT);
});
