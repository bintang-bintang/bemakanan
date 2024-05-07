const { where } = require("sequelize")
const detail = require("../models/detail")
const orderlist = require("../models/orderlist")

const makananModel = require(`../models/index`).makanan
const listModel = require(`../models/index`).orderList
const detailModel = require(`../models/index`).detail

const Op = require(`sequelize`).Op


exports.addOrder = async (request, response) => {
    try {
        const today = new Date()

        const dataOrderList = {
            namaPelanggan: request.body.namaPelanggan,
            nomorMeja: request.body.nomorMeja,
            tanggalOrder: today.toString()
        }

        const newOrderList = await listModel.create(dataOrderList)

        const banyakMakanan = request.body.banyakMakanan
        /*
        [
            {
                makananID: 1,
                kuantitas: 2
            },
            {
                makananID: 2,
                kuantitas: 3
            }
        ]
        */


        for (let index = 0; index < banyakMakanan.length; index++) {
            const makananData = await makananModel.findOne({ where: { makananID: banyakMakanan[index].makananID } })
            console.log(makananData);
            if (!makananData) {
                return response.json({
                    success: false,
                    message: "ID makanan tidak ada di database"
                })
            }
            let newDetail = {
                makananID: makananData.makananID,
                orderListID: newOrderList.orderListID,
                kuantitas: banyakMakanan[index].kuantitas,
                harga: makananData.harga * banyakMakanan[index].kuantitas
            }

            await detailModel.create(newDetail)
        }

        return response.json({
            success: true,
            message: "Data inserted"
        })


    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}

exports.showHistory = async (request, response) => {
    try {

        const jumlahData = await listModel.findAll()
        let a = []
        for (let index = 1; index <= jumlahData.length; index++) {
            let coba = await listModel.findOne({ where: { orderListID: index } })
            let coba2 = await detailModel.findAll({ where: { orderListID: index } })
            a.push(coba)
            a.push(coba2)
        }




        return response.json({
            success: true,
            data: a
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}