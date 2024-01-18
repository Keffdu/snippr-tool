const Sequelize = require("sequelize")
const db = require("../db/connection")

const User = db.define("users", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.INTEGER,
    vegetarian: Sequelize.BOOLEAN
})

module.exports = Item;