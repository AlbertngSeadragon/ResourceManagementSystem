const express = require("express");
const db = require("../db");

const router = express.Router();

// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

router.get("/", async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/:projectId", async (req, res, next) => {
  try {
    let results = await db.one(req.params.projectId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = router;
