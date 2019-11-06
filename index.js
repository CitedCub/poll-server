const express = require("express");
const app = express();

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://dbuser:OZdNx79TkvvOgENU@cluster0-2n8ue.mongodb.net/brand_insight?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require("./routes/index");

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(express.json());

app.use("/", indexRouter);

app.post("/test", (req, res) => res.json({ ...req.body, newData: "Hej!" }));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8000, () => {
  console.log("Poll app listening on port 8000");
});
