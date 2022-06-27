const express = require("express");
const session = require("express-session");
// const csrf = require("csurf");
const path = require("path");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const SessionStore = require("express-session-sequelize")(session.Store);
const db = require("./models/index");
const User = require("./models/index").User;

const app = express();
// const csrfProtection = csrf();
const sequelizeSessionStore = new SessionStore({
  db: db.sequelize,
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore,
  })
);

// app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(userRoutes);
app.use(authRoutes);
app.use(errorController.get404);

app.listen(3000);
