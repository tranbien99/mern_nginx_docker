import React, {useContext, useEffect} from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { AuthContext} from '../contexts/AuthContext'
import SingleCourse from '../components/courses/SingleCourse'
import AddNewCourseModal from '../components/courses/AddNewCourseModal'
import addIcon from '../assets/images/add-btn.svg'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import UpdateCourseModal from '../components/courses/UpdateCourseModal'
import Slider from '../components/layout/Slider'

const Dashboard = () => {
    const {authState: {user: {username}}} = useContext(AuthContext);
    const {
      courseState: {course, courses, coursesLoading}, 
      getCourses, 
      setShowAddNewCourseModal, 
      showToast: {show, message, type},
      setShowToast,
    } = useContext(CourseContext)

    useEffect(() => {
      getCourses() 
      return () => {
        console.log('Get all course')
      }
    },[])

    let body = null
    if (coursesLoading) {
      body = (
        <div className='spinner-container'>
          <Spinner animation='border' variant='info'/>
        </div>
      )
    } else if (courses.length === 0) {
      body = (
        <>
          <Card className='text-center mx-5 my-5'>
            <Card.Header as='h1'>Hello {username} 🍀 </Card.Header>
            <Card.Body>
              <Card.Title>Keep up the great work</Card.Title>
              <Card.Text>
                Click the button below to leart your first course
              </Card.Text>
              <Button variant='primary' onClick={() => setShowAddNewCourseModal(true)}>Learn</Button>
            </Card.Body>
          </Card>
        </>
      )
    } else {
      body = (
        <>
          <h5 className='text-center mt-3'>Your course(s)</h5>
          {/* Render course */}
          <Row className='row cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
            {courses.map(course => (
              <Col key={course._id} className='my-2'>
                <SingleCourse course={course} />
              </Col>
            ))}
          </Row>
          {/* Render add new course button */}
          <OverlayTrigger placement='left' overlay={<Tooltip style={{fontSize: 24}}>Click to add new course</Tooltip>}>
            <Button className='btn-floating' onClick={() => setShowAddNewCourseModal(true)}>
              <img src={addIcon} alt='add' width={60} height={60} className='add-img'/>
            </Button>
          </OverlayTrigger>
          
        </>
      )
    }

    return (
      <>
        <Slider/>
        {body}
        <AddNewCourseModal/>
        {course !== null && <UpdateCourseModal />}
        {/* Show notification afer submit new course */}
        <Toast show={show} style={{position: 'fixed', bottom: '10%', right: '40%', fontSize: 20}} className={`bg-${type} text-white`} onClose={() => setShowToast({show: false, message: '', type: null})} delay={3000} autohide animation={true}>
          <Toast.Body>
            {message}
          </Toast.Body>
        </Toast>
      </>

    )
}

export default Dashboard