const db = require('../models')
const { getPagination, getPagingData } = require('../services/pagination')
const Book = db.book
const Image = db.image

exports.index = (req, res) => {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)

  Book.findAndCountAll({
    where: {
      user_id: req.userId,
    },
    limit,
    offset,
    include: Image,
  })
    .then((result) => {
      const response = getPagingData(result, page, limit)
      res.status(200).json({
        ...response,
        message: 'show all book success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: 'title must be required',
    })
    return
  }

  const book = {
    user_id: req.userId,
    ...req.body,
  }

  Book.create(book)
    .then((result) => {
      res.status(201).json({
        data: result,
        message: 'Book created successfully',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.show = (req, res) => {
  const id = req.params.id

  Book.findByPk(id, {
    include: Image,
  })
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data',
        })
        return
      }

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

exports.update = (req, res) => {
  const id = req.params.id

  Book.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data',
        })
        return
      }

      Book.update(req.body, {
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).json({
              message: 'book updated successfully',
            })
          } else {
            res.status(400).json({
              message: `cannot update book with id ${id}`,
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          })
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Book.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data book',
        })
        return
      }

      Book.destroy({
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).json({
              message: 'Book deleted successfully',
            })
          } else {
            res.status(400).json({
              message: `cannot delete book with id ${id}`,
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          })
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}
