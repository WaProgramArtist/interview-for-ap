const ObjectId = require('mongoose').Types.ObjectId;

const Projects = require('../../models/projects/project.model');

exports.getListProject = async (req: any, res: any) => {
    try {
        const listProject = await Projects.find({});
        res.send(listProject);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getProjectDetail = async (req: any, res: any) => {
    try {
        const projectId = req.params.id;

        const project = await Projects.findById(projectId).populate({
            path: 'news',
            select: 'title_th title_en start_date stop_date',
        });

        res.send(project);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createProject = async (req: any, res: any) => {
    try {
        const { projectName, news } = req.body;

        let listNews = [];
        for (let i = 0; i < news.length; i++) {
            listNews.push(ObjectId(news[i]));
        }

        const newProject = new Projects({
            project_name: projectName,
            news: listNews,
        });

        await newProject.save();

        res.send(`Add project --> ${projectName} has success.`);
    } catch (err) {
        console.log(err);

        res.status(500).send(err);
    }
};

exports.updateProject = async (req: any, res: any) => {
    try {
        const projectId = req.params.id;
        const { projectName, news } = req.body;

        let listNews = [];
        for (let i = 0; i < news.length; i++) {
            listNews.push(ObjectId(news[i]));
        }

        await Projects.findOneAndUpdate(
            {
                _id: projectId,
            },
            {
                project_name: projectName,
                news: listNews,
            },
            {
                new: false,
                upsert: true,
            }
        );

        res.send(`Edit project --> ${projectName} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.removeProject = async (req: any, res: any) => {
    try {
        const projectId = req.params.id;
        await Projects.deleteOne({ _id: projectId });

        res.send(`delete project --> ${projectId} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};
