require('dotenv').config()
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const port=process.env.PORT
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: "none",
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
//     }
//   }))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

  
  
  const {
    db
  } = require('./models-connections');
  const router = require('./auth/router/index');
app.use("/auth", router);


app.get('/', (req, res) => {
  res.send('welcome')
})
db.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`server is lestining 0n port ${port}`);
    });
  });