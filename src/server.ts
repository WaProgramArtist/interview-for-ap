import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
    .connect('mongodb://localhost:27017/interview_testing', { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDB connected.');
    })
    .catch((err) => {
        console.log(err);
    });

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes');
routes(app);

app.listen(3001, () => {
    console.log('server running on port => 3001');
});
