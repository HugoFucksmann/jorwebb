const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

app.use("/buscan", require("./BusCan/root"));
app.use("/jorweb", require("./joraWeb/root"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log("server iniciado en puerto ", PORT);
});
