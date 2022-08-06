
const tech_blog_router = require('express').Router()

tech_blog_router.get('/', (req, res) => {
    res.render('index', { title: 'welcome' })
})

tech_blog_router.get('/login', (req, res) => {
    res.render('login', { title: 'login' })
})

tech_blog_router.get('/register', (req, res) => {
    res.render('register', { title: 'register' })
})
tech_blog_router.get('/homepage', (req, res) => {
    res.render('homepage', { title: 'homepage' })
})





module.exports = tech_blog_router;