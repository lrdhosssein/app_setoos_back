import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/routes.js";

import cors from "cors";
// import bodyParser from "body-parser";

const app = express();
app.use(logger("dev"));
app.set('subdomain offset', 0);
app.set('trust proxy', true);
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "200mb", extended: false }));
app.use(cookieParser());

const options = {
  extended: false,
  limit: "200mb",
  inflate: false,
};
app.use(express.urlencoded(options));
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static("public"));
app.use(express.static("public/static"));
app.use(cors());
app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "public", "index.html"));
});

export default app;
