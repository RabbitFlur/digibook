const db = require('../index')
const User = db.user

exports.userSeed = () => {
  User.create({
    name: 'ilham',
    email: 'radithya.ilham@gmail.com',
    phone: '08999',
    password: '$2a$08$Ri25LYKfKRAHBBFhh4B0BuRerhMRAuxkW0WbmFMkpWPOEULmKe6hy', //password
  })
}
