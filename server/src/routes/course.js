const express = require('express')
const router = express.Router()

const Course = require('../models/Course')
const verifyToken = require('../middleware/auth')

//route POST create courses
//access private
router.post('/', verifyToken, async (req, res) => {
	const {title, description, url, status} = req.body

	if (!title)
		return res.status(400).json({success: false, message: 'Title is required!'})
	
	try {
		const newCourse = new Course({
			title, 
			description, 
			url: (url.startsWith('https://')) ? url : `https://${url}`,
			status: status || 'Just create',
			user: req.userId,
		})
		await newCourse.save()

		res.json({success: true, message: 'Create course successfully', course: newCourse})

	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})

//route GET get courses
//access private
router.get('/', verifyToken, async (req, res) => {
	
	try {
		const courses = await Course.find({user: req.userId}).populate('user', ['username'])
		res.json({success: true, message: 'Get course successfully', courses})
	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})

//route PUT update courses
//access private
router.put('/:id', verifyToken, async (req, res) => {
	const {title, description, url, status} = req.body

	if (!title)
		return res.status(400).json({success: false, message: 'Title is required!'})
	
	try {
		let updateCourse = {
			title, 
			description: description || '', 
			url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
			status: status || 'Just create'
		}

	const courseUpdateCondition = {_id: req.params.id, user: req.userId}

	updateCourse = await Course.findByIdAndUpdate(courseUpdateCondition, updateCourse, {new: true})
	
	if(!updateCourse)
		return res.status(401).json({success: false, message: 'Course not found or user not authorized for update this course'})
	
	res.json({success: true, message: 'Update course successfully', course: updateCourse})

	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})

//route DELETE delete courses
//access private
router.delete('/:id', verifyToken, async (req, res) => {
	try {

		const courseDeleteCondition = {_id: req.params.id, user: req.userId}

		const deleteCourse = await Course.findByIdAndDelete(courseDeleteCondition)
		
		if(!deleteCourse)
			return res.status(401).json({success: false, message: 'Course not found or user not authorized for update this course'})
		
		res.json({success: true, message: 'Delete course successfully', course: deleteCourse})

	} catch (error) {
		res.status(500).json({success: false, message: "Something error"})
	}
})

module.exports = router