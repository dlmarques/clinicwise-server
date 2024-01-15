import app from "express";

const router = app.Router();

router.get("/", (req, res) => {
  res.status(200).json("up");
});

module.exports = router;
