/** load model for `users` table */
const adminModel = require(`../models/index`).admin
const md5 = require(`md5`)

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

exports.register = async (request, response) => {
    try {
        let newAdmin = {
            nama: request.body.nama,
            email: request.body.email,
            password: md5(request.body.password),
        }
        /** execute inserting data to user's table */
        const data = await adminModel.create(newAdmin)
        return response.json({
            success: true,
            data: data,
            message: `New user has been inserted`
        })  
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }


}
