const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    hum: {
        type: Number,
        required: false
    },
    temp: {
        type: Number,
        required: false
    }
}, {
    timestamps: true // This option adds createdAt and updatedAt fields
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;

