const tech_blog_router = require('express').Router();
const api_routes = require('./api_routes')
const homeRoutes = require('./')
const dashBoardRoutes = require()

tech_blog_router.use('/api', api_routes)

tech_blog_router.use((req, res) => {
    res.status(404).end();
})

module.exports = tech_blog_router