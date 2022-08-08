const tech_blog_router = require('express').Router();

const {Post, User, Comment} = require('../../models');
const sequelize = require("../../config/db_connection")
const withAuth = require("../../utils/auth");


tech_blog_router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ["id", "title", "content", "created_at"],
            order: [["created_at", "DESC"]],
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
                    }
                }
            ]
        })
        res.status(200).json(dbPostData);
    }catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

tech_blog_router.get("/:id", async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
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
                     }
                }
            ]
        })
        console.log(dbPostData);


        if (!dbPostData){
            res.status(404).json({message: "no post found with this id"});
            return;
        }
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

tech_blog_router.post("/", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
      console.log(dbPostData);
  
      res.status(200).json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  tech_blog_router.put("/:id", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.status(200).json(dbPostData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  tech_blog_router.delete("/:id", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = tech_blog_router;

  