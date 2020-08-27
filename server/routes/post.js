

const express = require("express");
const {
    getPosts, 
    createPost, 
    postsByUser, 
    postById, 
    deletePost, 
    isPoster, 
    updatePost, 
    Photo,
    SinglePost,
    like,
    unlike,
    comment,
uncomment} = require("../controllers/post");
const {requireSignin} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validators/post");

const router = express.Router();

// like unlike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// comments
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

router.get("/posts",  getPosts);
router.post("/post/new/:userId",  createPost, createPostValidator );
router.get("/posts/By/:userId", requireSignin, postsByUser);
router.get("/post/:postId",   SinglePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);


// photo
router.get("/post/photo/:postId", Photo);

// any route containing  :userId. our app will fist execute userById
router.param("userId",  userById);

// any route containing  :userId. our app will fist execute postById
router.param("postId", postById);

module.exports = router;

// mongodb+srv://stan:123greatman@cluster0-ehpux.mongodb.net/test?retryWrites=true&w=majority




