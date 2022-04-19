const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
	title: {type: String, required: true},
	description: {type: String},
	url: {type: String},
	status: {type: String, enum: ['Just create', 'Im learning', 'Done']},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
}, {timestamps: true})

module.exports = mongoose.model('courses', Course)