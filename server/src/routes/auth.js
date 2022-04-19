const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const User = require('../models/User')
const verifyToken = require('../middleware/auth')

//route GET check user login
//access public
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({success: false, message: 'User not found'})
		res.json({success: true, user})
	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})

//Route POST Register
//access public
router.post('/register', async (req, res) => {
	const {username, password} = req.body

	if (!username || !password){
		return res.status(400).json({success: false, message: 'Missing username or password'})
	}
		
	
	try {
		const user = await User.findOne({username})

		if(user)
			return res.status(400).json({success: false, message: 'This username already used'})
	
		const hashPassword = await argon2.hash(password)
		const newUser = new User({username, password: hashPassword})
		await newUser.save()

		const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

		res.json({success: true, message: 'Register successfully', accessToken})
	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})

//Route POST Login
//access public
router.post('/login', async (req, res) => {
	const {username, password} = req.body

	if (!username || !password){
		return res.status(400).json({success: false, message: 'Missing username or password'})
	}

	try {
		//check username in db
		const user = await User.findOne({username})
		if(!user)
			return res.status(400).json({success: false, message: 'This username or password is invalid'})
		//check password in db
		const passwordValid = await argon2.verify(user.password, password)
		if(!passwordValid)
			return res.status(400).json({success: false, message: 'This username or password is invalid'})
		
		const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

		res.json({success: true, message: 'Login successfully', accessToken})
	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})



module.exports = router