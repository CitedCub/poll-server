var express = require("express");
var router = express.Router();

var answers_controller = require("../controllers/answersController");

router.get("/", function(req, res, next) {
  res.send("Respond with a resource");
});

// POST request for creating Answers
router.post("/answers/create", answers_controller.answers_create_post);

module.exports = router;
