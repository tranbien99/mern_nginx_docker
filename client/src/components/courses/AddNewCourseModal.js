import React, {useContext, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { CourseContext } from '../../contexts/CourseContext'

const AddNewCourseModal = () => {
	const {showAddNewCourseModal, setShowAddNewCourseModal, addCourse, setShowToast} = useContext(CourseContext)

	const [newCourse, setNewCourse] = useState({
		title: '',
		description: '',
		url: '',
		status: 'Just create'
	})

	const {title, description, url} = newCourse

	const onChangeAddNewCourseForm = event => setNewCourse({...newCourse, [event.target.name]: event.target.value})

	const closeDialog = () => {
		setNewCourse({
			title: '',
			description: '',
			url: '',
			status: 'Just create'
		})
		setShowAddNewCourseModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await addCourse(newCourse)
		//reset
		setNewCourse({
			title: '',
			description: '',
			url: '',
			status: 'Just create'
		})
		setShowAddNewCourseModal(false)
		setShowToast({show: true, message, type: success ? 'success' : 'danger'})
	}

	return (
		<>
			<Modal show={showAddNewCourseModal} onHide={closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>What course do you want to study ?</Modal.Title>
				</Modal.Header>
				<Form onSubmit={onSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Control type='text' placeholder='Title of course' name='title' required aria-describedby='title-help' value={title} onChange={onChangeAddNewCourseForm}/>
							<Form.Text id='title-help' muted>Required</Form.Text>
						</Form.Group>
						<Form.Group>
							<Form.Control as='textarea' rows={3} placeholder='Description of course' name='description' value={description} onChange={onChangeAddNewCourseForm}/>
						</Form.Group>
						<Form.Group>
							<Form.Control type='text' placeholder='Url of course' name='url' value={url} onChange={onChangeAddNewCourseForm}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='danger' onClick={closeDialog}>Cancle</Button>
						<Button variant='info' type='submit'>Create</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default AddNewCourseModal