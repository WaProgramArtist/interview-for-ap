import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        project_name: String,
        news: [{ type: Schema.Types.ObjectId, ref: 'news' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('projects', projectSchema);
