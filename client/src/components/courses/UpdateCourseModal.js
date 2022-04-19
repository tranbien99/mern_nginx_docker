import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { CourseContext } from '../../contexts/CourseContext'

const UpdateCourseModal = () => {
	const {courseState: {course},showUpdateCourseModal, setShowUpdateCourseModal, updateCourse, setShowToast} = useContext(CourseContext)

	const [updatedCourse, setUpdateCourse] = useState(course)

	useEffect(() => setUpdateCourse(course), [course])

	const {title, description, url, status} = updatedCourse

	const onChangeUpdateCourseForm = event => setUpdateCourse({...updatedCourse, [event.target.name]: event.target.value})

	const closeDialog = () => {
		setUpdateCourse(course)
		setShowUpdateCourseModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateCourse(updatedCourse)
		//reset
		// setNewCourse({
		// 	title: '',
		// 	description: '',
		// 	url: '',
		// 	status: 'Just create'
		// })
		setShowUpdateCourseModal(false)
		setShowToast({show: true, message, type: success ? 'success' : 'danger'})
	}

	return (
		<>
			<Modal show={showUpdateCourseModal} onHide={closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>Update your course</Modal.Title>
				</Modal.Header>
				<Form onSubmit={onSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Control type='text' placeholder='Title of course' name='title' required aria-describedby='title-help' value={title} onChange={onChangeUpdateCourseForm}/>
							<Form.Text id='title-help' muted>Required</Form.Text>
						</Form.Group>
						<Form.Group>
							<Form.Control as='textarea' rows={3} placeholder='Description of course' name='description' value={description} onChange={onChangeUpdateCourseForm}/>
						</Form.Group>
						<Form.Group>
							<Form.Control type='text' placeholder='Url of course' name='url' value={url} onChange={onChangeUpdateCourseForm}/>
						</Form.Group>
						<Form.Group>
							<Form.Control as='select' name='status' value={status} onChange={onChangeUpdateCourseForm}>
								<option value='Just create'>Just create</option>
								<option value='Im learning'>Im learning</option>
								<option value='Done'>Done</option>
							</Form.Control>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='danger' onClick={closeDialog}>Cancle</Button>
						<Button variant='info' type='submit'>Update</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default UpdateCourseModal