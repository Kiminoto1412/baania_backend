const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.post('/home', homeController.createHouse);
router.get('/home', homeController.getHouses);

router.get('/postCode', homeController.getPostCode);

router.get(
  '/postCode/:id',
  homeController.getAverageAndMedianPriceByPostCodeId
);

module.exports = router;
