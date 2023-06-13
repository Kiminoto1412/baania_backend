const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');

const homeRoutes = require('./routes/home');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

// ----------------------------- Sync to create database -----------------------------
// const { sequelize, User } = require('./models/index');
// sequelize.sync({ alter: true });
// ----------------------------- Sync to create database -----------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('', homeRoutes);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => console.log(`\n\n\nRunning port ${port}`));
