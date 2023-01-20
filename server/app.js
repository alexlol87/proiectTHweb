import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MainRouter } from './routes/index.js';
import {Activity,Teacher as models}  from "./models/index.js";
import {sequelize} from './config/index.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//? mount the router to start from http://localhost:8080/api
 app.use('/api', MainRouter);


let serverPort = 8080;
app.listen(serverPort, () => {
    console.log(`Express web server running on http://localhost:8080/api`);
});
