const { House, sequelize } = require('../models');
const createError = require('../util/createError');

exports.createHouse = async (req, res, next) => {
  try {
    const { name, desc, price, post_code } = req.body;
    if (!name) {
      createError('name is require', 400);
    }
    if (!desc) {
      createError('description is require', 400);
    }
    if (!price) {
      createError('price is require', 400);
    }
    if (!post_code) {
      createError('postcode is require', 400);
    }
    const regexPostCode = /^[0-9]{5}$/;
    if (!regexPostCode.test(post_code)) {
    }
    const regexPrice = /^[0-9]{1,}[.][0-9]{2}$/;
    if (!regexPrice.test(price)) {
      createError('Invalid price', 400);
    }
    const house = await House.create({
      name,
      desc,
      price,
      post_code,
    });
    res.status(201).json({
      house,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHouses = async (req, res, next) => {
  try {
    const offset = +req.query.skip;
    const limit = +req.query.take;

    const { count, rows: houses } = await House.findAndCountAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      offset,
      limit,
    });

    res.status(200).json({
      payload: houses,
      count,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostCode = async (req, res, next) => {
  try {
    const houses = await House.findAll({
      attributes: [
        sequelize.fn('DISTINCT', sequelize.col('post_code')),
        'post_code',
      ],
    });
    const count = houses.length;

    res.status(200).json({
      payload: houses,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAverageAndMedianPriceByPostCodeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const houses = await House.findAll({
      where: {
        post_code: id,
      },
      attributes: ['price'],
    });

    let prices = houses.map((house) => +house.price);
    prices.sort((a,b)=> a-b)

    const average = prices.reduce((a, b) => a + b, 0) / prices.length;

    const median =
      prices.length % 2 === 0
        ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
        : prices[(prices.length - 1) / 2];
        
    res.status(200).json({
      payload: {
        average :average.toFixed(12),
        median:median.toFixed(1),
      },
    });
  } catch (err) {
    next(err);
  }
};
