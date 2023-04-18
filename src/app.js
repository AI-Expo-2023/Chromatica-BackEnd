const express = require('express');
const { sequelize } = require('./models');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const dot = require('dotenv');
const multer = require('multer');

const port = process.env.PORT || 8000;
dot.config();

const corsOptions = {
    origin: '*',
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    Credential: true,
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use(express.static('img'));

app.set("jwt-secret", process.env.JWT);

app.use("/", router);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);

    sequelize.sync({ force: false})
    .then(() => {
        console.log("Success linking Database");

        const { Photo } = require('./models');

        setInterval(async () => {
            await Photo.findAll({
                order: [['like', 'DESC']],
            })
        }, 1000 * 3600 * 24)

    })
    .catch((err) => {
        console.error(err)
    });
});