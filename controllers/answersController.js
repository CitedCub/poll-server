var Answers = require("../models/answers");

exports.answers_create_post = function(req, res) {
  console.log(req.body);
  var answers = new Answers({
    first_answer: req.body.first_answer,
    second_answer: req.body.second_answer,
    submit_date: new Date()
  });

  answers.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(JSON.stringify(answers));
  });
};
