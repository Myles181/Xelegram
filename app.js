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
const searchChannelTelegramRouter = require("./routers/searchChannelRouter");
const searchUserTelegramRouter = require("./routers/searchUserRouter");
const getChatsRouter = require("./routers/getChatsRouter");

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


// CORS Configuration
// app.use(cors({
//   origin: function (origin, callback) {
//     const allowedOrigins = ["*"];
    
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 204
// }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // Preflight request
  }
  next();
});

// Allow requests from specific origins
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));


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
