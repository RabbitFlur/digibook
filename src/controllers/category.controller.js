const db = require('../models')
const Category = db.category

exports.create = (req, res) => {
  Category.create({
    name : req.body.name,
  })
  .then((user) => {
    res.status(201).json({
      message: 'category has created',
    })
  })
  .catch((err) => {
    res.status(500).json({
      message: err.message,
    })
  })
}
