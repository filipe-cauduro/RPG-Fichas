import "reflect-metadata";
import * as express from "express";
import { port } from "../config.json";
import {json} from "body-parser";
import * as cors from "cors";
import {config} from "dotenv";
import userRouter, { baseRoute as userBaseRoute } from "./api/user/user";

config();

const app = express();
app.use(json());
app.use(cors());

app.use(userBaseRoute, userRouter);

app.listen(port, () => {
    console.log(`Listening to the port: ${port}`);
});