const db = require('../config/database')

db.user = require('./user.model')(db.sequelize, db.Sequelize)
db.category = require('./category.model')(db.sequelize, db.Sequelize)
db.book = require('./book.model')(db.sequelize, db.Sequelize)
db.image = require('./image.model')(db.sequelize, db.Sequelize)

db.book.hasMany(db.image, {
  foreignKey: 'book_id',
})

db.book.belongsTo(db.user, {
  foreignKey: 'user_id',
})

db.category.hasMany(db.book, {
  foreignKey: 'category_id',
})

db.user.hasMany(db.book, {
  foreignKey: 'user_id',
})

module.exports = db
