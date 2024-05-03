const Data = require('../models/data');

const getDataFromDB = async () => {
    // Data.find({}).then(data => {
    //     console.log(data);
    //     return data;
    // })
    try {
        const data = await Data.find({}).sort({ createdAt: -1 }); // Sorting by createdAt in descending order
        console.log('k');
        return data;
    } catch (e) {
        console.error(e);
        return false; // later add errors
    }

}

module.exports = getDataFromDB;