const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    project_slug: {
        required: true,
        type: String,
        unique: true,
    },
    github_url: {
        required: true,
        type: String,
    },
    default_branch: {
        required: true,
        type: String,
    },
    host_url: {
        required: true,
        type: String,
    },
    azure_job_id: {
        required: true,
        type: String,
    },
    env: [{
        name: String,
        value: String
    }],
    frame_work: {
        required: true,
        type: String,
    },
    cmd: [String],
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:"users"}
    


}, { timestamps: true })

const projectCollection = mongoose.model('project', schema)

module.exports = projectCollection