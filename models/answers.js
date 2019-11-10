var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswersSchema = new Schema({
  answers: [{ type: String, required: true, max: 100 }],
  questionnaire: {
    type: Schema.Types.ObjectId,
    ref: "questionnaire"
  },
  submit_date: { type: Date }
});

module.exports = mongoose.model("Answers", AnswersSchema);
