const makananModel = require(`../models/index`).makanan
const upload = require(`./upload-image`).single(`image`)
const path = require(`path`)
const fs = require(`fs`)
const Op = require(`sequelize`).Op



exports.findMakanan = async (request, response) => {
    try {
        /** define keyword to find data */
        let keyword = request.query.key

        if (!keyword || keyword.trim() === "") {
            const showAll = await makananModel.findAll()

            return response.json({
                success: true,
                message: "Your keyword is empty but will showAll instead",
                data: showAll
            });
        }

        /** call findAll() within where clause and operation
        * to find data based on keyword */
        let makanans = await makananModel.findAll({
            where: {
                [Op.or]: [
                    { nama: { [Op.substring]: keyword } },
                    { pedasLvl: { [Op.substring]: keyword } },
                    { harga: { [Op.substring]: keyword } }
                ]
            }
        })
        return response.json({
            success: true,
            data: makanans,
            message: `All Makanans have been loaded`
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }

}
/** create function to add new makanan */
exports.addMakanan = (request, response) => {
    /** run function upload */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** check if file is empty */
        // if (!request.file) {
        //     return response.json({ message: `Nothing to Upload` })
        // }
        /** prepare data from request */
        let newMakanan = {
            nama: request.body.nama,
            pedasLvl: request.body.pedasLvl,
            harga: request.body.harga,
            image: null
        }
        if (request.file) {
            newMakanan.image = request.file.filename
        }

        /** execute inserting data to makanan's table */
        makananModel.create(newMakanan)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true,
                    data: result,
                    message: `New makanan has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process fail */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.updateMakanan = async (request, response) => {
    /** run upload function */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected makanan ID that will update */
        let makananID = request.params.id
        const selectedMakanan = await makananModel.findOne({
            where: { makananID: makananID }
        })

        if (!selectedMakanan) {
            return response.json({
                success: false,
                message: "Makanan ID tidak ada!"
            })
        }
        /** prepare makanan's data that will update */
        let dataMakanan = {
            nama: request.body.nama,
            pedasLvl: request.body.pedasLvl,
            harga: request.body.harga
        }
        /** check if file is not empty,
        * it means update data within reupload file
        */
        if (request.file) {
            /** get old filename of image file */
            const oldImage = selectedMakanan.image
            /** prepare path of old image to delete file */
            const pathImage = path.join(__dirname, `../image`, oldImage)
            /** check file existence */
            if (fs.existsSync(pathImage)) {
                /** delete old image file */
                fs.unlink(pathImage, error => console.log(error))
            }
            /** add new image filename to makanan object */
            dataMakanan.image = request.file.filename
        }
        /** execute update data based on defined id makanan */
        makananModel.update(dataMakanan, {
            where: {
                makananID: makananID
            }
        })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data makanan has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}
exports.deleteMakanan = async (request, response) => {
    try {
        /** store selected makanan's ID that will be delete */
        const id = request.params.id
        /** -- delete image file -- */
        /** get selected makanan's data */
        const selectedMakanan = await makananModel.findOne({
            where: { makananID: id }
        })

        if (!selectedMakanan) {
            return response.json({
                success: false,
                message: "Makanan ID tidak ada!"
            })
        }

        // const allSeatMakanan = await seatModel.findAll({where: {makananID: id}})
        /** get old filename of image file */
        const oldImage = selectedMakanan.image
        // /** prepare path of old image to delete file */
        const pathImage = path.join(__dirname, `../image`, oldImage)
        // /** check file existence */
        if (fs.existsSync(pathImage)) {
            /** delete old image file */
            fs.unlink(pathImage, error => console.log(error))
        }
        /** -- end of delete image file -- */
        /** execute delete data based on defined id makanan */
        makananModel.destroy({ where: { makananID: selectedMakanan.makananID } })

        return response.json({
            success: true,
            data: selectedMakanan,
            message: `Data makanan has been deleted`
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}
