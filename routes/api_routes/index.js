const tech_blog_router = require('express').Router();
const userRoutes = require('./user_routes')
const postRoutes = require('./post-routes')
const commentRoutes = require('./comment-routes')


tech_blog_router.use('/users', userRoutes);
tech_blog_router.use('/posts', postRoutes);
tech_blog_router.use('/comments', commentRoutes);

module.exports = tech_blog_router