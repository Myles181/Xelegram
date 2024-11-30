const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authRouter = require("./routers/authRouter");
const contactsRouter = require("./routers/contactsRouter");
const chatRoomRouter = require("./routers/chatRoomRouter");
const profileRouter = require("./routers/profileRouter");
const uploadRouter = require("./routers/uploadRouter");
// Telegram
const authTelegramRouter = require("./routers/telegram/authRouter");
const joinChannelTelegramRouter = require("./routers/telegram/joinChannelRouter");
const messageUserTelegramRouter = require("./routers/telegram/messageUserRouter");
const searchChannelTelegramRouter = require("./routers/telegram/searchChannelRouter");
const searchUserTelegramRouter = require("./routers/telegram/searchUserRouter");


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

// Routes
app.use("/api/user", authRouter);

// Protector
app.use("/api/*", (req, res, next) => {
  if (!req.cookies.userId)
    return next(new ReqError(400, "You are not logged in"));
  

  next();
});

app.use("/api/contacts", contactsRouter);
app.use("/api/profile", profileRouter);
app.use("/api/chatRoom", chatRoomRouter);
app.use("/api/upload", uploadRouter);


// Telegram
app.use("/t/api", authTelegramRouter);
app.use("/t/api", joinChannelTelegramRouter);
app.use("/t/api", messageUserTelegramRouter);
app.use("/t/api", searchChannelTelegramRouter);
app.use("/t/api", searchUserTelegramRouter);

// Error handle middleware
app.use(errorController);


module.exports = app;
