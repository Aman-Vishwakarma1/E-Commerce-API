const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

// Database Connection
const connectDb = require("./config/dbconnect.js");

const app = express();
const PORT = 4800;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");
connectDb();

const swaggerUICss =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
// const corsOptions = {
//   origin: "http://localhost:5500", // Allow only requests from this origin
//   methods: "GET,POST", // Allow only these methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
// };

app.use(cors());
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: swaggerUICss,
  })
);

app.use("/home", require("./routes/homeRoutes.js")); // Home Routes
app.use("/seller", require("./routes/sellerRoutes.js")); // Owner Routes
app.use("/customer", require("./routes/customerRoutes.js")); // Customer Routes

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running and Woking Fine !" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
