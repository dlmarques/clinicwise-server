const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { auth } = require("express-oauth2-jwt-bearer");
//Routes
const appointmentsRoute = require("./routes/appointments");
const userRoute = require("./routes/user");

dotenv.config();
app.use(cors());

const PORT = 3000;
const HOST_NAME = "localhost";

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
});

//mongo connection
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Connected to MongoDB");
  })
  .on("error", (error: any) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwtCheck);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/appointments", appointmentsRoute);
app.use("/user", userRoute);

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at ${HOST_NAME}:${PORT}`);
});
