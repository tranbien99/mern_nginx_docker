import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Slider1 from '../../assets/images/slider-1.jpg'
import Slider2 from '../../assets/images/slider-2.jpg'

const Slider = () => {
  return (
	<>
		<Carousel className='w-50 h-70 m-auto'>
			<Carousel.Item>
				<img
				className="d-block w-100"
				src={Slider1}
				alt="First slide"
				/>
				<Carousel.Caption>
				<h3>Study by your self</h3>
				<p>Believe you can and you're halfway there</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
				className="d-block w-100"
				src={Slider2}
				alt="Second slide"
				/>

				<Carousel.Caption>
				<h3>Free to learn</h3>
				<p>Happiness is not by chance, but by choice.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	</>
  )
}

export default Slider