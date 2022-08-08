const { Post } = require('../models');

const postData = [{
        title: 'What MVC means to me',
        content: 'Not just a little but alot, its a ton of fun and whatever else',
        user_id: 1
    },
    {
        title: 'Authentication vs Authorization',
        content: 'Thats the question.',
        user_id: 1
    },
    {
        title: 'O.R.M.',
        content: 'SQL queries were not very intresting until I started using ORM, now I cant get enough.',
        user_id: 2
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;