const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequest('Please provide credentials')
    }
    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'User Created', token })
}

const dashboard = (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello There! ${req.user.username}`, secret: `Your Lucky Number is ${luckyNumber}` })
}

module.exports = {
    login, dashboard
}