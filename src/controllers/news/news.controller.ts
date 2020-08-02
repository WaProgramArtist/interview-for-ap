import moment from 'moment';

const News = require('../../models/news/news.model');

exports.getListNews = async (req: any, res: any) => {
    try {
        const listNews = await News.find({});
        res.send(listNews);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getNewsDetail = async (req: any, res: any) => {
    try {
        const newsId = req.params.id;
        const news = await News.findById(newsId);

        res.send(news);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createNews = async (req: any, res: any) => {
    try {
        const { titleTh, titleEn, detailTh, detailEn, startDate, stopDate } = req.body;

        const newNews = new News({
            title_th: titleTh,
            title_en: titleEn,
            detail_th: detailTh,
            detail_en: detailEn,
            start_date: moment.utc(startDate),
            stop_date: moment.utc(stopDate),
        });

        await newNews.save();

        res.send(`Add news --> ${titleEn} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateNews = async (req: any, res: any) => {
    try {
        const newsId = req.params.id;
        const { titleTh, titleEn, detailTh, detailEn, startDate, stopDate } = req.body;

        await News.findOneAndUpdate(
            {
                _id: newsId,
            },
            {
                title_th: titleTh,
                title_en: titleEn,
                detail_th: detailTh,
                detail_en: detailEn,
                start_date: moment(startDate),
                stop_date: moment(stopDate),
            },
            {
                new: false,
                upsert: true,
            }
        );

        res.send(`Edit news --> ${titleEn} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.removeNews = async (req: any, res: any) => {
    try {
        const newsId = req.params.id;
        await News.deleteOne({ _id: newsId });

        res.send(`delete newsId --> ${newsId} has success.`);
    } catch (err) {
        res.status(500).send(err);
    }
};
