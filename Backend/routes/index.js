import {Router} from "express";
import {join} from "path";

export const router = Router();

router.get('/', function(req, res, next) {
  res.sendFile(join(__dirname, 'public/index.html'));
});


