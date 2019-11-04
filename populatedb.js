#! /usr/bin/env node

console.log(
  "This script populates some test answers to your database. Specified database as argument - e.g.: populatedb mongodb+srv://dbuser:OZdNx79TkvvOgENU@cluster0-2n8ue.mongodb.net/test?retryWrites=true&w=majority"
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

var mongoose = require("mongoose");
// var mongoDB = userArgs[0];
mongoose.connect("mongodb+srv://dbuser:OZdNx79TkvvOgENU@cluster0-2n8ue.mongodb.net/brand_insight?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var answersArray = [];

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

async.series(
  [createAnswers],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Answers array: " + answersArray);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
