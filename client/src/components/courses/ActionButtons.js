import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/images/play-btn.svg'
import editIcon from '../../assets/images/edit-btn.svg'
import delIcon from '../../assets/images/delete-btn.svg'
import { CourseContext } from '../../contexts/CourseContext'

const ActionButtons = ({url, _id}) => {
    const {deleteCourse, findCourse, setShowUpdateCourseModal} = useContext(CourseContext)

    const chooseCourse = courseId => {
      findCourse(courseId)
      setShowUpdateCourseModal(true)
    }
  
    return (
      <>
        <Button className='course-button' href={url} target='_blank'>
          <img src={playIcon} alt='playvideo' width={50} height={48}/>
        </Button>
        <Button className='course-button' onClick={(() => chooseCourse(_id))}>
          <img src={editIcon} alt='edit' width={50} height={30}/>
        </Button>
        <Button className='course-button' onClick={() => deleteCourse(_id)}>
          <img src={delIcon} alt='del' width={50} height={35}/>
        </Button>
      </>
    )
}

export default ActionButtons