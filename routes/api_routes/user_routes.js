const tech_blog_router = require('express').Router()
const {User, Post, Comment} = require('../../models');

tech_blog_router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },

        });
        res.json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
});

tech_blog_router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ["password"] },
            where: {
                id: req.params.id,
            },
            include: [
              {
                model: Post,
                attributes: ["id", "title", "content", "created_at"],
              },

              {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                  model: Post,
                  attributes: ["title"],
                },
              },
              {
                model: Post,
                attributes: ["title"],
              },
            ],
        });
        if (!userData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

tech_blog_router.put("/:id", async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id,
            },
        });
        if (!userData[0]) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

tech_blog_router.delete("/:id", async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



tech_blog_router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        console.log(req.session)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.password = userData.password;
            req.session.loggedIn = true;

            res.json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

tech_blog_router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'no user matching that login!' });
            return;
        }
        const correctPassword = userData.checkPassword(req.body.password)
        if (!correctPassword) {
            res.status(400).json({ message: 'no user matching that login!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'you are now logged in!' })
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});
tech_blog_router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => { res.status(204).end() })
    } else {
        res.status(404).end()
    }
});

module.exports = tech_blog_router