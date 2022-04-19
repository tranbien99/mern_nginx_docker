import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ActionButtons from './ActionButtons'

const SingleCourse = ({course: {_id, title, description, url, status}}) => {
  return (
	<>
		<Card className='shadow' border={status === 'Done' ? 'success' : status === 'Im learning' ? 'warning' : 'danger'} >
			<Card.Body>
				<Card.Title>
					<Row>
						<Col>
							<p className='course-title'>{title}</p>
							<Badge bg={status === 'Done' ? 'success' : status === 'Im learning' ? 'warning' : 'danger'}>{status}</Badge>
						</Col>
						<Col className='text-end'>
							<ActionButtons url={url} _id={_id}></ActionButtons>
						</Col>
					</Row>
				</Card.Title>
				<Card.Text>{description}</Card.Text>
			</Card.Body>
		</Card>
	</>
  )
}

export default SingleCourse