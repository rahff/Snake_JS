import {Router} from "express";

export const index_router = Router();

index_router.get("/", (req, res) => {
    return res.render("index");
})

index_router.get("/home", (req, res) => {
    return res.render("landing_page");
})

index_router.get("/login", (req, res) => {
    return res.render("components/login_form");
})
