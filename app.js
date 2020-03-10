var express = require("express");
var path = require("path");
const logger = require("morgan");
//const pgSession = require()

const PORT = 3000;

const indexRouter = require("./routes/index");

const app = express();

// Pick and choose which middleware you want
// You will definitely add to and subtract from this list

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;