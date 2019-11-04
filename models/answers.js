var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswersSchema = new Schema({
  first_answer: { type: String, required: true, max: 100 },
  second_answer: { type: String, required: true, max: 100 },
  submit_date: { type: Date }
});

module.exports = mongoose.model("Answers", AnswersSchema);
