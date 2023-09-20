import express from "express";
import ControllerUsers from "../controllers/controllerUsers.js";
import ControllerPosts from "../controllers/controllerPosts.js";
import uploadUser from "../config/uploadUser.js";
import uploadPost from "../config/ulploadPost.js";

const router = express.Router()

router
    .get('/getusers', ControllerUsers.getUsers)
    .post('/newuser', uploadUser.single('img'), ControllerUsers.newUser)
    .delete('/deleteuser/:id', ControllerUsers.deleteUser)
    .patch('edituser')

    .get('/getposts', ControllerPosts.getPosts)
    .post('/newpost', uploadPost.single('image'), ControllerPosts.addPost)
    .delete('/deletepost/:id', ControllerPosts.deletePost)
    .patch('/editpost/:id', uploadPost.single('image'), ControllerPosts.editPost)

export default router