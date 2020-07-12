const  multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const mobil = require('../controller/mobil')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar")

router.post( "/input" , upload, (req, res) => {
    mobil.inputDataMobil(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/datamobil", (req, res) => {
    mobil.lihatDataMobil()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/datamobil/:id", (req, res) => {
    mobil.lihatDetailDataMobil(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
    mobil.hapusmobil(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
    let fileName;
    if (!req.body.gambar) {
        fileName = req.file.filename;
    } else {
        fileName = req.body.gambar;
    }
    mobil.updateMobil(req.params.id, req.body, fileName )
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router