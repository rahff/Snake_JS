import express from "express";
import helmet from "helmet";
import {join} from "path";
import {index_router} from "./routes/views/index.routes.js";
import {competitor_router} from "./routes/api/competitor.routes.js";
import {competition_router} from "./routes/api/competition.routes.js";
import {authentication_router} from "./routes/api/authentication.routes.js";
import {api_router} from "./routes/api/api.routes.js";
import {cspConfig} from "./config.js";


export const app = express();


app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(helmet({contentSecurityPolicy: cspConfig}));
app.use(express.json());
app.use(express.static("public"));
app.use(index_router);
app.use("/api", api_router);


app.listen(3000, () => {
    console.log("started");
})