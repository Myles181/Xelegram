const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// Telegram
const authTelegramRouter = require("./routers/authRouter");
const joinChannelTelegramRouter = require("./routers/joinChannelRouter");
const messageUserTelegramRouter = require("./routers/messageUserRouter");
const searchChannelTelegramRouter = require("./routers/searchChannelRouter");
const searchUserTelegramRouter = require("./routers/searchUserRouter");
const getChatsRouter = require("./routers/getChatsRouter")


const ReqError = require("./utilities/ReqError");
const errorController = require("./controllers/errorController");

// Session handler
const session = require("express-session");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if HTTPS is used
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      sameSite: "lax" // Controls cookie sharing across sites
    }
  })
);

// Use session before defining any routes
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());


// Telegram
app.use("/t/api", authTelegramRouter);
app.use("/t/api", joinChannelTelegramRouter);
app.use("/t/api", messageUserTelegramRouter);
app.use("/t/api", searchChannelTelegramRouter);
app.use("/t/api", searchUserTelegramRouter);
app.use("/t/api", getChatsRouter);

// Error handle middleware
app.use(errorController);


module.exports = app;
