const tech_blog_router = require('express').Router();
const { Router } = require('express');
const sequelize = require("../config/db_connection")
const {Post, User, Comment} = require("../models");
const withAuth = require("../utils/auth");


tech_blog_router.get("/", async (req, res) => {
    console.log(req.session);
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ["id", "title", "content", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_At",
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
        })

        const posts = dbPostData.map(post => post.get({plain: true}));

        res.render("homepage", {posts, loggedIn: true});
    }catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

tech_blog_router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "title", "content", "created_at"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
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
            ],
        });

        if (!dbPostData) {
            res.status(404).json({message: "no post found with this id"});
            return;
        }

        const post = dbPostData.get({plain: true});
        res.render("edit-post", {post, loggedIn: true});
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

tech_blog_router.get("/new", (req, res) => {
    res.render("new-post", {loggedIn: true});
});

module.exports = tech_blog_router

