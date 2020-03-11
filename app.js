var express = require("express");
var path = require("path");
const logger = require("morgan");
const pgSession = require("./middleware/pgsession");
const CORS = require("cors");
//const sendEmail = require("./sendmail");

const PORT = process.env.PORT || 5000;

const indexRouter = require("./routes/index");

const app = express();

// Pick and choose which middleware you want
// You will definitely add to and subtract from this list
app.use(CORS());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(pgSession);

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
