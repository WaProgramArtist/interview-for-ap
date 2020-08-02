import express from 'express';
const projectRouter = express.Router();
const projectController = require('../controllers/projects/projects.controller');

projectRouter.route('/').get(projectController.getListProject).post(projectController.createProject);

projectRouter
    .route('/:id')
    .get(projectController.getProjectDetail)
    .put(projectController.updateProject)
    .delete(projectController.removeProject);

module.exports = projectRouter;
