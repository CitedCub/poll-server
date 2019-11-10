var Questionnaire = require("../models/questionnaire");
var Question = require("../models/question");

exports.questionnaire_get = function(req, res) {
  console.log("ID parameter: ", req.params.id);
  Questionnaire.findById(req.params.id)
    .populate("questions")
    .then(questionnaire => {
      res.json(questionnaire);
    });
};
