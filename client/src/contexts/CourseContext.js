import React, {createContext, useReducer, useState} from 'react'
import {courseReducer} from '../reducers/courseReducer'
import {apiUrl, COURSES_LOADED_FAIL, COURSES_LOADED_SUCCESS, COURSES_ADD_SUCCESS, COURSES_DELETE_SUCCESS, COURSES_UPDATE_SUCCESS, FIND_COURSE} from './constants'
import axios from 'axios'

export const CourseContext = createContext()

const CourseContextProvider = ({children}) => {
	const [courseState, dispatch] = useReducer(courseReducer, {
		course: null,
		courses: [],
		coursesLoading: true,
	})

	const [showAddNewCourseModal, setShowAddNewCourseModal] = useState(false)
	const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		messege: '',
		type: null
	})

	//Get all course
	const getCourses = async () => {
		try {
			const response = await axios.get(`${apiUrl}/courses`)
			if (response.data.success) {
				dispatch({type: COURSES_LOADED_SUCCESS, payload: response.data.courses})
			}
		} catch (error) {
			dispatch({Type: COURSES_LOADED_FAIL})
		}
	}

	//post new course
	const addCourse = async newCourse => {
		try {
			const response = await axios.post(`${apiUrl}/courses`, newCourse)
			if (response.data.success) {
				dispatch({type: COURSES_ADD_SUCCESS, payload: response.data.course})
				return response.data
			}
		} catch (error) {
			return error.response.data ? error.response.data : {success: false, message: 'something error'}
		}
	}

	//Delete course
	const deleteCourse = async courseId => {
		try {
			const response = await axios.delete(`${apiUrl}/courses/${courseId}`)
			if (response.data.success) {
				dispatch({type: COURSES_DELETE_SUCCESS, payload: courseId})
			}
		} catch (error) {
			return error.response.data ? error.response.data : {success: false, message: 'something error'}
		}
	}

	//Update course
	const updateCourse = async updateCourse => {
		try {
			const response = await axios.put(`${apiUrl}/courses/${updateCourse._id}`, updateCourse)
			if(response.data.success) {
				dispatch({type: COURSES_UPDATE_SUCCESS, payload: response.data.course})
				return response.data
			}
		} catch (error) {
			return error.response.data ? error.response.data : {success: false, message: 'something error'}
		}
	}

	//Find course when click edit button
	const findCourse = courseId => {
		const course = courseState.courses.find(course => course._id === courseId)
		dispatch({type: FIND_COURSE, payload: course})
	}

	//Course context data
	const courseContextData = {
		courseState, 
		getCourses, 
		showAddNewCourseModal, 
		setShowAddNewCourseModal, 
		addCourse, showToast, 
		setShowToast, 
		deleteCourse, 
		updateCourse, 
		findCourse, 
		showUpdateCourseModal, 
		setShowUpdateCourseModal
	}

	return (
		<CourseContext.Provider value={courseContextData}>
			{children}
		</CourseContext.Provider>
	)
}

export default CourseContextProvider