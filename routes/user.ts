import app from "express";
import { formatDataFromDatabase } from "../resources/helpers/FormatDataFromDatabase";
import { requiredScopes } from "express-oauth2-jwt-bearer";
const User = require("../models/User");
const {
  default: responseHelper,
} = require("../resources/helpers/ResponseHelper");

//Authorization middleware
const checkScopes = requiredScopes("read:appointments");

const router = app.Router();

router.post("/login", async (req, res) => {
  const { email, name } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    const foundedUser = formatDataFromDatabase(userExist._doc);
    return res.status(200).send(responseHelper(foundedUser, null));
  }

  const userModel = new User({
    email,
    name,
  });

  try {
    const savedUser = await userModel.save();
    const user = formatDataFromDatabase(savedUser._doc);
    res.status(200).send(responseHelper(user, null));
  } catch (error) {
    res.status(500).send(responseHelper(null, error));
  }
});

module.exports = router;
