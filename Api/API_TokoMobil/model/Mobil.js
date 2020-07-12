const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    kodeMobil:{
        type: String
    },
    harga:{
        type: String
    },
    brand:{
        type: String
    },
    bodi:{
        type: String
    },
    bahanBakar:{
        type: String
    },
    gambar:{
        type: String
    }

});

module.exports = mongoose.model('mobil',userSchema)
