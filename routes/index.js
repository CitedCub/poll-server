var express = require("express");
var router = express.Router();

var answers_controller = require("../controllers/answersController");
var questionnaire_controller = require("../controllers/questionnaireController");

router.get("/questionnaire/:id", questionnaire_controller.questionnaire_get);

router.get("/answers", answers_controller.answers_get);

// POST request for creating Answers
router.post("/answers/create", answers_controller.answers_create_post);

module.exports = router;
