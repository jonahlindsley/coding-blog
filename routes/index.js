const tech_blog_router = require('express').Router();
const { Router } = require('express');
const api_routes = require('./api_routes')

tech_blog_router.use('/api', api_routes)

tech_blog_router.use((req, res) => {
    res.status(404).end
})

module.exports = tech_blog_router