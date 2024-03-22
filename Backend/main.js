import express from "express";
import helmet from "helmet";
import {join} from "path";
import {index_router} from "./routes/index.routes.js";
import {competitor_router} from "./routes/competitor.routes.js";


const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(index_router);
app.use("/user", competitor_router);


app.listen(3000, () => {
    console.log("started");
})