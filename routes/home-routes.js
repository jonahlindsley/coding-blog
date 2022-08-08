
const { Router } = require("express");
const sequelize = require("../config/db_connection");
const {Post, User, Comment} = require("../models");
const tech_blog_router = require("express").Router();


tech_blog_router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ["id", "title", "content", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at",
                    ],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render("homepage", {posts, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


tech_blog_router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

tech_blog_router.get("/register", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("register");
});

tech_blog_router.get("/post/:id", async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id", 
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at",
                    ],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        if (!dbPostData) {
            res.status(404).json({message: "no post found with that id"});
            return;
        }
        const post = dbPostData.get({plain: true});
        console.log(post);
        res.render("single-post", {post, loggedIn: req.session.loggedIn});
    }catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


tech_blog_router.get("/posts-comment", async (req, res) => {

    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at",
                    ],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });


        if (!dbPostData){
            res.status(404).json({message: "no post found with this id"});
            return;
        }
        const post = dbPostData.get({plain: true});

        res.render("posts-comments", {post, loggedIn: req.session.loggedIn});
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = tech_blog_router