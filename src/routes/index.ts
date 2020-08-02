const authorization = require('../authorization');

const loginRouter = require('./login.route');
const userRouter = require('./user.route');
const projectRouter = require('./project.route');
const newsRouter = require('./news.route');

module.exports = (app: any) => {
    app.use('/login', loginRouter);
    app.use('/user', authorization, userRouter);
    app.use('/project', authorization, projectRouter);
    app.use('/news', authorization, newsRouter);
};
