var Answers = require("../models/answers");

exports.answers_get = function(req, res) {
  Answers.find().then(answersArray => {
    res.send(JSON.stringify(answersArray));
  });
};

exports.answers_create_post = function(req, res) {
  console.log("Got requestBody: ", req.body);
  var answers = new Answers({
    answers: req.body.answers,
    questionnaire: req.body.questionnaire,
    submit_date: new Date()
  });

  answers.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(JSON.stringify(answers));
  });
};
