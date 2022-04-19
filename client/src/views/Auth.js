import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'

import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'


const Auth = ({authRoute}) => {
	const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
	let contentForm

	if (authLoading) 
		contentForm = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info'/>
			</div>
	)
	else if (isAuthenticated) return <Redirect to='/dashboard' />
	else 
		contentForm = (
			<>
				{
					(authRoute === 'login') && <LoginForm />
				}
				{
					(authRoute === 'register') && <RegisterForm />
				}
			</>
		)

	return (
		<>
			<div className='landing'>
				<div className='dark-overlay'>
					<div className='landing-inner'>
						<h1>What will you learn today</h1>
						{contentForm}
					</div>				
				</div>
			</div>
		</>
	)
}

export default Auth