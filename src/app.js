const express = require('express');
const { sequelize } = require('./models');
const router = require('./router');
const cors = require('cors');

const port = process.env.PORT || 8000;
require('dotenv').config();

const corsOptions = {
    origin: '*',
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    Credential: true,
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.set("jwt-secret", process.env.JWT);

app.use("/", router);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);

    sequelize.sync({ force: false})
    .then(() => {
        console.log("Success linking Database");
    })
    .catch((err) => {
        console.error(err)
    });
});