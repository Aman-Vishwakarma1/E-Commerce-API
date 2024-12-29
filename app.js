const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

// Database Connection
const connectDb = require("./config/dbconnect");

const app = express();
const PORT = 4800;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");
connectDb();

app.use("/seller", require("./routes/sellerRoutes.js")); // Owner Routes

app.get("/", (req, res) => {
  res.send("Server is Running and Woking Fine !");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
