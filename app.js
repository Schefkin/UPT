const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');




// functions
const SendToDB = require('./functions/sendDataToServer')
const getDataFromDB = require('./functions/getDataFromDB')


// connecting to database

const dbUrl = 'parool';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('nice db')
})




const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({ extended: true }));


app.post('/api', (req, res) => {
    const { hum, temp } = req.query;
    // Process the data...

    if (!hum || !temp) {
        res.render('error.ejs');
    } else {
        SendToDB(hum, temp);
        res.status(204).send();
    }
});


app.get('/', async (req, res) => {
    const datas = await getDataFromDB();
    // console.log(datas);

    res.render('home.ejs', { datas });
})

app.get('/test', async (req, res) => {
    const datas = await getDataFromDB();
    // here

    const dataByYear = {};

    // Loop through the data and group it by year
    datas.forEach((item) => {
        const year = new Date(item.createdAt).getFullYear(); // Extract the year from 'createdAt'

        // If the year key doesn't exist in dataByYear, create an empty array for it
        if (!dataByYear[year]) {
            dataByYear[year] = [];
        }

        // Push the item into the corresponding year's array
        dataByYear[year].push(item);
    });

    
    const dataByYearArray = Object.entries(dataByYear).map(([year, data]) => ({ year, data }));

    dataByYearArray.sort((a, b) => b.year - a.year);


    // here

    res.render('test.ejs', { dataByYearArray });
})



const port = pordi_number;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});