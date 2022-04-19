import { COURSES_ADD_SUCCESS, COURSES_DELETE_SUCCESS, COURSES_LOADED_FAIL, COURSES_LOADED_SUCCESS, COURSES_UPDATE_SUCCESS, FIND_COURSE } from "../contexts/constants"

export const courseReducer = (state, action) => {
	const {type, payload} = action
	switch (type) {
		case COURSES_LOADED_SUCCESS:
			return {
				...state,
				courses: payload,
				coursesLoading: false
			}
		case COURSES_LOADED_FAIL:
			return {
				...state,
				courses: [],
				coursesLoading: false
			}
		case COURSES_ADD_SUCCESS:
			return {
				...state,
				courses: [...state.courses, payload]
			}
		case COURSES_DELETE_SUCCESS:
			return {
				...state,
				courses: state.courses.filter(course => course._id !== payload)
			}
		case FIND_COURSE:
			return {
				...state,
				course: payload

			}
		case COURSES_UPDATE_SUCCESS:
			const updateCourse = state.courses.map(course => {
				if(course._id === payload._id)
					return payload
				return course
			})
			return {
				...state,
				courses: updateCourse
			}
		default:
			return state
	}
}