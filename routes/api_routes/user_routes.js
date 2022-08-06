const tech_blog_router = require('express').Router()
const User = require('../../models');

tech_blog_router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ['[password']},

        });
        res.json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

tech_blog_router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (!userData){
        res.status(400).json({message: 'no user matching that login!'});
        return;
    }
    const correctPassword = userData.checkPassword(req.body.password)
    if (!correctPassword){
        res.status(400).json({message: 'no user matching that login!'});
        return;
    }
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json({user: userData, message: 'you are now logged in!'})
    })
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})
tech_blog_router.post('/logout', (req, res) => {
if (req.session.loggedIn){
    req.session.destroy(() => {res.status(204).end()})
}else{
    res.status(404).end()
}
})