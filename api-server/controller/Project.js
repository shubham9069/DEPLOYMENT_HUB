const projectCollection = require("../model/Project");
const { containerBuilderServerJob, genrateAccessToken } = require("../utils/AzureJob");



async function createProject(req, res, initRedisSubscribe) {
    try {
        const { user_id, clone_url, project_slug, frame_work, env, node_module_cmd, build_cmd, branch_name, build_foldername, repo_url } = req.body;
        
        let response = await containerBuilderServerJob(clone_url, project_slug, process.env.ACCESS_TOKEN, env, node_module_cmd, build_cmd, build_foldername);

        if (response?.message == "ExpiredAuthenticationToken") {
            const accessTokenResponse = await genrateAccessToken();
            if (accessTokenResponse.status != 200) {
                return res.status(500).json({ status: "error", errors: 'token not genrate' });
            }

            NEW_ACCESS_TOKEN = accessTokenResponse.data.access_token;

            response = await containerBuilderServerJob(clone_url, project_slug, NEW_ACCESS_TOKEN, env, node_module_cmd, build_cmd, build_foldername);

            if (response.status != 200) {
                return res.status(400).json({ status: "error", errors: "error " });
            }

        }
        await initRedisSubscribe();
        let insertData = {
            project_slug: project_slug,
            clone_url: clone_url,
            host_url: `http://${project_slug}.localhost:8000`,
            azure_job_id: response?.data?.name,
            frame_work: frame_work,
            env: env,
            cmd: [node_module_cmd, build_cmd],
            user_id: user_id,
            default_branch: branch_name,
            repo_url: repo_url

        };

        let dbResponse = await projectCollection.create(insertData);
        return res.json({
            status: "queued",
            data: dbResponse,
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ status: "error", message: err.message });
    }

}
async function getAllProject(req, res) {
    const { user_id } = req.query
    try {
        let dbResponse = await projectCollection.find({ user_id: user_id });
        return res.json({
            status: "success",
            data: dbResponse,
        });
    } catch (err) {
        return res.json({ status: "error", message: err.message });
    }

}
async function getAllProjectwithUserData(req, res) {
    try {
        let dbResponse = await projectCollection.aggregate([
            { $match: {} },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            }
        ]);
        return res.json({
            status: "success",
            data: dbResponse,
        });
    } catch (err) {
        return res.json({ status: "error", message: err.message });
    }

}
async function getProjectBySlug(req, res) {
    const { project_slug } = req.params
    try {
        let dbResponse = await projectCollection.findOne({ project_slug: project_slug });
        return res.json({
            status: "success",
            data: dbResponse,
        });
    } catch (err) {
        return res.json({ status: "error", message: err.message });
    }

}



module.exports = { getProjectBySlug, getAllProject, createProject, getAllProjectwithUserData }