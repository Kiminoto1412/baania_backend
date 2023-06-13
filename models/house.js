module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validator: {
          isDecimal: true,
        },
      },
      post_code: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validator: {
          is: /^[0-9]{5}$/,
        },
      },
    },
    { underscored: true, paranoid: true }
  );
  return House;
};
