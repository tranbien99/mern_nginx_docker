import React, {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertNotification from '../layout/AlertNotification'

const RegisterForm = () => {

  const {registerUser} = useContext(AuthContext)

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [alert, setAlert] = useState(null)

  const {username, password, confirmPassword} = registerForm

  const onChangeRegisterForm = event => setRegisterForm({
    ...registerForm,
    [event.target.name]: event.target.value
  })

  const register = async event => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setAlert({type: 'danger', message: 'Password and confirm password not match'})
      setTimeout(() => setAlert(null), 3000)
      return
    }

    try {
      const registerData = await registerUser(registerForm)
      if (registerData.success) {
      } else {
        setAlert({type: 'danger', message: registerData.message})
        setTimeout(() => setAlert(null), 3000)
      }
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
	<>
      <Form onSubmit={register}>
        <AlertNotification info={alert} />
        <Form.Group className='m-4'>
          <Form.Control type='text' placeholder='Type your username' name='username' value={username} onChange={onChangeRegisterForm} required></Form.Control>
        </Form.Group>
        <Form.Group className='m-4'>
          <Form.Control type='password' placeholder='Type your password' name='password' value={password} onChange={onChangeRegisterForm} required></Form.Control>
        </Form.Group> 
		<Form.Group className='m-4'>
          <Form.Control type='password' placeholder='Confirm your password' name='confirmPassword' value={confirmPassword} onChange={onChangeRegisterForm} required></Form.Control>
        </Form.Group>
        <Button variant='success' type='submit' className='mb-2'>Register</Button>
      </Form>
      <p>Already have an account ? <Link to='/login'>Click here</Link></p>
  </>
  )
}

export default RegisterForm