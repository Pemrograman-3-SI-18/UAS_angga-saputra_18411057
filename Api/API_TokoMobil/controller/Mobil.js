const mobil = require('../model/Mobil.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataMobil = (data, gambar) =>
    new Promise(async (resolve, reject) =>{

        const mobilBaru = new mobil({
            kodeMobil: data.kodeMobil,
            harga: data.harga,
            brand: data.brand,
            bodi: data.bodi,
            bahanBakar: data.bahanBakar,
            gambar: gambar
        })

        await mobil.findOne({kodeMobil: data.kodeMobil})
            .then(mobil => {
                if (mobil){
                    reject (response.commonErrorMsg("Kode Mobil Sudah Digunakan"))
                } else {
                    mobilBaru.save()
                        .then(r => {
                            resolve(response.commonSuccesMsg('Berhasil Menginput Data'))
                        }).catch(err => {
                            reject (response.commonErrorMsg('Mohon Maaf Gagal Input Data'))
                    })
                }
            }).catch(err => {
                reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.lihatDataMobil = () =>
    new Promise(async (resolve, reject) => {
        await mobil.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.lihatDetailDataMobil = (kodeMobil) =>
    new Promise(async (resolve, reject) => {
        await mobil.findOne({kodeMobil: kodeMobil})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.updateMobil = (id, data, gambar) =>
    new Promise(async (resolve, reject) =>{
        await mobil.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodeMobil: data.kodeMobil,
                    harga: data.harga,
                    brand: data.brand,
                    bodi: data.bodi,
                    bahanBakar: data.bahanBakar,
                    gambar: gambar
                }
            }
        ) .then(mobil => {
            resolve(response.commonSuccesMsg('Berhasil Mengubah Data'))
        }) .catch(err => {
            reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.hapusmobil = (_id) =>
    new  Promise(async (resolve, reject) => {
        await mobil.remove({_id: ObjectId(_id)})
            .then(() =>{
                resolve(response.commonSuccesMsg('berhasil Menghapus Data'))
            }) .catch(() => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalhan Pada Server Kami'))
            })
    })
