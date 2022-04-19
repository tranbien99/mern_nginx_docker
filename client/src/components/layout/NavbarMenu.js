import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/esm/Button'
import {Link} from 'react-router-dom'

import Logo from '../../assets/images/logo.svg'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
	const {authState: {user: {username}}, logoutUser} = useContext(AuthContext)

	const logOut = () => logoutUser()

	return (
		<>
			<Navbar expand='lg' bg='info' variant='dark' className='shadow'>
				<Navbar.Brand className='font-weigt-bolder text-white'>
					<img src={Logo} alt='logo' width={32} height={32} className='m-2'/>
					What will you learn today?
				</Navbar.Brand>
			
				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav >
						<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
							Dash board
						</Nav.Link>

						<Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
							About
						</Nav.Link>
					</Nav>

					<Nav className='ms-auto m-2'>
						<Nav.Link className='font-weight-bolder text-white' disabled>Welcome {username}</Nav.Link>

						<Button variant='danger' className='font-weight-bolder text-white' onClick={logOut}>
							<i class="bi bi-box-arrow-right"></i>
							Log out
						</Button>
					</Nav>				
				</Navbar.Collapse>
			</Navbar>
		</>
	)
}

export default NavbarMenu