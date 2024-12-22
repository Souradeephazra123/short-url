import express from "express";

import {shortenUrl,redirectUrl} from '../controller/url.controller.js'


const UrlRouter = express.Router();

UrlRouter.post("/api/shorten", shortenUrl);

UrlRouter.get("/:shortUrl", redirectUrl);


export default UrlRouter;