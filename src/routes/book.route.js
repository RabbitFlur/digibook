const middleware = require('../middleware')
const controller = require('../controllers/book.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/book', middleware.verifyToken, controller.index)
  app.post('/api/book', middleware.verifyToken, controller.create)
  app.get('/api/book/:id', middleware.verifyToken, controller.show)
  app.patch('/api/book/:id', middleware.verifyToken, controller.update)
  app.delete('/api/book/:id', middleware.verifyToken, controller.delete)
}
