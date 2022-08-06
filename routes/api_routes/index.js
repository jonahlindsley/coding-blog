const tech_blog_router = require('express').Router();
const userRoutes = require('./user_routes')

tech_blog_router.use('/users', userRoutes)


module.exports = tech_blog_router