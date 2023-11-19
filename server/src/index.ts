import express from "express";
import http from "http";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

// import files
import router from "./router";
import { envConfig } from './config/env';
import { mongo_error, mongo_succ, run_server } from "./config/static";

// important variables
const app = express();

// db connection with atlas
mongoose.Promise = Promise;
mongoose.connect(envConfig.MONGOPATH);
mongoose.connection.on('error', (error) => console.error(mongo_error, error));
mongoose.connection.once('open', () => console.log(mongo_succ));

// important middlewares
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// all routers
app.use("/", router());

// run server
const server = http.createServer(app);
server.listen(envConfig.PORT, () => {
  console.log(`${run_server} ${envConfig.PORT}`)
})

