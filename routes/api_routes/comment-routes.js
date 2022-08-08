const tech_blog_router = require('express').Router();
const { Router } = require('express');
const {Comment} = require("../../models");
const withAuth = require("../../utils/auth");

tech_blog_router.get("/", async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({});

        res.json(dbCommentData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


tech_blog_router.get("/:id", async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.json(dbCommentData);
    }catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


tech_blog_router.post("/", withAuth, async (req, res) => {
    if (req.session) {
        try {
            const dbCommentData = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.json(dbCommentData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
});



Router.put("/:id", withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.update(
            {
                comment_text: req.body.comment_text,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!dbCommentData) {
            res.status(404).json({message: "no comment found with this id"});
            return;
        }
        res.json(dbCommentData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


tech_blog_router.delete("/:id", withAuth, async (req, res) => {
try {
    const dbCommentData = await Comment.destroy({
        where: {
            id: req.params.id,
        },
    });
    if (!dbCommentData) {
        res.status(404).json({message: "no comment found with this id"});
        return;
    }
    res.json(dbCommentData);
}catch (err) {
    console.log(err);
    res.status(500).json(err);
}
})


module.exports = tech_blog_router