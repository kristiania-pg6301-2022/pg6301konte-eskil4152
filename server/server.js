import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { LoginApi } from "./APIs/LoginApi.js";
import { UserApi } from "./APIs/UserApi.js";
import { MessagesApi } from "./APIs/MessagesApi.js";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use((req, res, next) => {
  const { access_token, ms_access_token } = req.signedCookies;
  if (
    (req.path.startsWith("/profile") || req.path.startsWith("/messages")) &&
    !(access_token || ms_access_token)
  ) {
    return res.redirect("/login/alternatives");
  }
  next();
});

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to database");

  app.use("/api/login", LoginApi(mongoClient.db("pg6301-kont")));
  app.use("/api/user", UserApi(mongoClient.db("pg6301-kont")));
  app.use("/api/messages", MessagesApi(mongoClient.db("pg6301-kont")));
});

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connect", (socket) => {
  console.log("Ws connected");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Server at http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, () => {
      wsServer.emit("connect", socket, req);
    });
  });
});