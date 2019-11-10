#! /usr/bin/env node

console.log(
  "This script populates some questions, questionnnaires and answers to the database. Specified database as argument - e.g.: populatedb mongodb+srv://dbuser:OZdNx79TkvvOgENU@cluster0-2n8ue.mongodb.net/test?retryWrites=true&w=majority"
);

// Get arguments passed on command line
// var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Answers = require("./models/answers");
var Questionnaire = require("./models/questionnaire");
var Question = require("./models/question");

var mongoose = require("mongoose");
// var mongoDB = userArgs[0];
mongoose.connect(
  "mongodb+srv://dbuser:OZdNx79TkvvOgENU@cluster0-2n8ue.mongodb.net/brand_insight?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let answersArray = [];
let questions = [];
let questionnaires = [];

function answersCreate(first_answer, second_answer, d_submit, cb) {
  answersdetail = { first_answer: first_answer, second_answer: second_answer };
  if (d_submit != false) answersdetail.submit_date = d_submit;

  var answers = new Answers(answersdetail);

  answers.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Answers: " + answers);
    answersArray.push(answers);
    cb(null, answers);
  });
}

function questionCreate(title, choices, cb) {
  const question = new Question({ title: title, choices: choices });

  question.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Question: " + question);
    questions.push(question);
    cb(null, question);
  });
}

function questionnaireCreate(title, questions, cb) {
  const questionnaire = new Questionnaire({
    title: title,
    questions: questions
  });

  questionnaire.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Questionnaire: " + questionnaire);
    questionnaires.push(questionnaire);
    cb(null, questionnaire);
  });
}

function createAnswers(cb) {
  async.series(
    [
      function(callback) {
        answersCreate("Svar 1", "Svar 2", "1973-06-06", callback);
      },
      function(callback) {
        answersCreate("Ben", "Bova", "1932-11-8", callback);
      },
      function(callback) {
        answersCreate("Isaac", "Asimov", "1920-01-02", callback);
      },
      function(callback) {
        answersCreate("Bob", "Billings", "1976-09-04", callback);
      },
      function(callback) {
        answersCreate("Jim", "Jones", "1971-12-16", callback);
      }
    ],
    // optional callback
    cb
  );
}

function createQuestions(cb) {
  async.parallel(
    [
      function(callback) {
        questionCreate(
          "Vad tycker du om koriander?",
          ["Gott", "Inte gott"],
          callback
        );
      },
      function(callback) {
        questionCreate(
          "Vilka föredrar du?",
          ["Demokrater", "Republikaner"],
          callback
        );
      },
      function(callback) {
        questionCreate(
          "Vilken är din favoritfärg?",
          ["Röd", "Gul", "Blå", "Grön"],
          callback
        );
      },
      function(callback) {
        questionCreate(
          "Vilken är din favoritsiffra?",
          ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          callback
        );
      }
    ],
    cb
  );
}

function createQuestionnaires(cb) {
  async.series(
    [
      function(callback) {
        questionnaireCreate(
          "Mat och amerikansk politik",
          [questions[0], questions[1]],
          callback
        );
      },
      function(callback) {
        questionnaireCreate(
          "Personliga favoriter",
          [questions[2], questions[3]],
          callback
        );
      }
    ],
    cb
  );
}

function testFunc(cb) {
  async.series(
    [
      function(callback) {
        console.log("First test");
        callback(null, "1st");
      },
      function(callback) {
        console.log("Second test");
        callback(null, "2nd");
      }
    ],
    cb
  );
}

async.series(
  [createAnswers, createQuestions, createQuestionnaires],
  // [testFunc],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("All done!");
    }
    // All done, disconnect from database
    console.log("Closing DB connection");
    mongoose.connection.close();
  }
);
