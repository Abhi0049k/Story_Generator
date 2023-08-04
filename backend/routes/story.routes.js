const express = require('express');
const { story, favoriteStory, allFavorite } = require('../controllers/story.controllers');

const storyRouter = express.Router();

storyRouter.post('/', story)

storyRouter.post('/favorite', favoriteStory);

storyRouter.get('/allFavor', allFavorite);

module.exports = storyRouter;