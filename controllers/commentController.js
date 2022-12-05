const comment_Schema = require('../models/comment_Schema')

const create = async (req, res) => {
    const createData = new comment_Schema(req.body)
    try {
        const createRes = await createData.save()
        res.json(createRes)
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}



module.exports = { create }
