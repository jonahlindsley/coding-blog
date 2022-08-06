
const tech_blog_router = require('express').Router()

tech_blog_router.get('/', (req, res) => {
res.json('you did it!')
})

module.exports = tech_blog_router;