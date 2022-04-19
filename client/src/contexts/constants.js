export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'someURL'

export const LOCAL_STORAGE_TOKEN_NAME = 'wwyltd-storage'

export const COURSES_LOADED_SUCCESS = 'COURSES_LOADED_SUCCESS'
export const COURSES_LOADED_FAIL = 'COURSES_LOADED_FAIL'
export const COURSES_ADD_SUCCESS = 'COURSES_ADD_SUCCESS'
export const COURSES_DELETE_SUCCESS = 'COURSES_DELETE_SUCCESS'
export const COURSES_UPDATE_SUCCESS = 'COURSES_UPDATE_SUCCESS'
export const FIND_COURSE = 'FIND_COURSE'