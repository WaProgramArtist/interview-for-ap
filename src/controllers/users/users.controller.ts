const ObjectIds = require('mongoose').Types.ObjectId;

const Users = require('../../models/users/user.model');

exports.getListUsers = async (req: any, res: any) => {
    try {
        const listUser = await Users.find({});
        res.send(listUser);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getUserInfo = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);

        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getNewsOfUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId).populate({
            path: 'project',
            select: 'project_name',
            populate: {
                path: 'news',
                select: 'title_th title_en',
            },
        });

        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createUser = async (req: any, res: any) => {
    try {
        const { username, password, name, lastName, phoneNo, project } = req.body;

        const newUser = new Users({
            user_name: username,
            pass_word: password,
            name: name,
            last_name: lastName,
            phone_no: phoneNo,
            project: project,
        });

        await newUser.save();

        res.send(`Add new user --> ${username} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const { username, password, name, lastName, phoneNo, project } = req.body;

        await Users.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                user_name: username,
                pass_word: password,
                name: name,
                last_name: lastName,
                phone_no: phoneNo,
                project: project,
            },
            {
                new: false,
                upsert: true,
            }
        );

        res.send(`Edit user --> ${username} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.removeUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        await Users.deleteOne({ _id: userId });

        res.send(`delete user --> ${userId} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateUserReadNews = async (req: any, res: any) => {
    try {
        const userId = req.params.userId;
        const newsId = req.params.newsId;

        await Users.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                $push: {
                    reading: ObjectIds(newsId),
                },
            },
            {
                new: false,
                upsert: true,
            }
        );

        res.send(`Edit user --> ${userId} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};
