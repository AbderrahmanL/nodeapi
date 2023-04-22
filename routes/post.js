const express = require('express');
const {getPosts, createPost} = require("../controllers/post");
const {check} = require("express-validator");

const router = express.Router();

router.get('/', getPosts);

router.post('/post', 
    [check('title').notEmpty().withMessage("Write a title"),
    check('title').isLength({
        min: 4,
        max: 150
    }).withMessage("title must be btw 4 and 150 characters"),
    check('body').notEmpty().withMessage("Write a body"),
    check('body').isLength({
        min: 4,
        max: 2000
    }).withMessage("body must be btw 4 and 2000 characters")],
    createPost);

module.exports = router;