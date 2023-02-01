module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('books', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pages : {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sinopsis: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  })

  return Book
}
