import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        title_th: String,
        title_en: String,
        detail_th: String,
        detail_en: String,
        start_date: Date,
        stop_date: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('news', newsSchema);
