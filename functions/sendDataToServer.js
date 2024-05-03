const Data = require('../models/data');
const mongoose = require('mongoose');



const SendToDB = async (hum, temp) => {
    const data = new Data({
        hum,
        temp
    })
    await data.save().then(p => {
        console.log('k');
    })
    .catch(e => {
        console.log(e);
    })
}
// SendToDB().then(() => {
//     mongoose.connection.close();
// })


module.exports = SendToDB;