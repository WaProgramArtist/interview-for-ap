import express from 'express';
const newsRouter = express.Router();
const newsController = require('../controllers/news/news.controller');

newsRouter.route('/').get(newsController.getListNews).post(newsController.createNews);

newsRouter
    .route('/:id')
    .get(newsController.getNewsDetail)
    .put(newsController.updateNews)
    .delete(newsController.removeNews);

module.exports = newsRouter;
