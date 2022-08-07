require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static('./views'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.status(200).render('index', {
        PEXEL_API_KEY: process.env.PEXEL_API_KEY
    });

});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
});