const db = require('../models')
const Book = db.book
const Image = db.image
const User = db.user
const Op = db.Sequelize.Op

exports.search = (req, res) => {
  // const lat = parseFloat(req.query.lat)
  // const lng = parseFloat(req.query.lng)
  const { title } = req.query
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Book.findAll({
   ...condition,
    include: Image
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'list book success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.detail = (req, res) => {
  id = req.params.id
  Book.findByPk(id, {
    include: [
      { model: Image, as: 'images' },
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'show book success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.random = (req, res) => {
  Book.findAll({
    limit: 10,
    order: db.sequelize.literal('rand()'),
    include: Image,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'show random books success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}
