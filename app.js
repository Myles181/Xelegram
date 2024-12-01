const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");



// Telegram Routers
const authTelegramRouter = require("./routers/authRouter");
const joinChannelTelegramRouter = require("./routers/joinChannelRouter");
const messageUserTelegramRouter = require("./routers/messageUserRouter");
const messageChannelTelegramRouter = require("./routers/messageChannelsRouter")
const searchChannelTelegramRouter = require("./routers/searchChannelRouter");
const searchUserTelegramRouter = require("./routers/searchUserRouter");
const getChatsRouter = require("./routers/getChatsRouter");
const getChannelChatsRouter = require("./routers/getChannelChatsRouter");
const getUserChatsRouter = require("./routers/getUserChatsRouter");



const ReqError = require("./utilities/ReqError");
const errorController = require("./controllers/errorController");

const corsOptions ={
  // origin:'https://telegram-clone-wine.vercel.app', 
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


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
      sameSite: "lax", // Controls cookie sharing across sites
    },
  })
);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Telegram Clone API",
      version: "1.0.0",
      description: "API documentation for the Telegram Clone application",
    },
  },
  apis: ["./routers/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Telegram Routes
app.use("/t/api", authTelegramRouter);
app.use("/t/api", joinChannelTelegramRouter);
app.use("/t/api", messageUserTelegramRouter);
app.use("/t/api", searchChannelTelegramRouter);
app.use("/t/api", searchUserTelegramRouter);
app.use("/t/api", getChatsRouter);
app.use("/t/api", getChannelChatsRouter);
app.use("/t/api", getUserChatsRouter);
app.use("/t/api", messageChannelTelegramRouter);

// Error Handling Middleware
app.use(errorController);

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Telegram Clone API</h1>
    <p>Explore the API endpoints:</p>
    <p><a href="/api-docs">View API Documentation</a></p>
  `);
});


module.exports = app;
