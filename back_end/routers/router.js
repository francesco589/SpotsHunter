import express from "express";
import Controller from "../controllers/controller.js";
import upload from "../config/upload.js";

const router = express.Router()

router
    .get('/getusers', Controller.getUsers)
    .post('/newuser', upload.single('img'), Controller.newUser)
    



export default router