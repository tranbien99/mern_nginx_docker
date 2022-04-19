import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, useHistory} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertNotification from '../layout/AlertNotification'

const LoginForm = () => {
  const {logInUser} = useContext(AuthContext)

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const [alert, setAlert] = useState(null)

  const {username, password} = loginForm

  const onChangeLoginForm = event => setLoginForm({
    ...loginForm,
    [event.target.name]: event.target.value
  })

  const login = async event => {
    event.preventDefault()

    try {
      const loginData = await logInUser(loginForm)
      if (loginData.success) {
      } else {
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 3000)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
	<>
      <Form onSubmit={login}>
        <AlertNotification info={alert} />
        <Form.Group className='m-4'>
          <Form.Control type='text' placeholder='Type your username' name='username' required value={username} onChange={onChangeLoginForm}></Form.Control>
        </Form.Group>
        <Form.Group className='m-4'>
          <Form.Control type='password' placeholder='Type your password' name='password' required value={password} onChange={onChangeLoginForm}></Form.Control>
        </Form.Group>
        <Button variant='success' type='submit' className='mb-2'>Login</Button>
      </Form>
      <p>Don't have an account ? <Link to='/register'>Click here</Link></p>
  </>
  )
}

export default LoginForm