const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  choices: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Question", QuestionSchema);
