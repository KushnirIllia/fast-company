import React, { useState } from 'react'
import LoginForm from '../components/ui/loginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/registerForm'
// import PropTypes from 'prop-types'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const toggleFormType = () => {
    setFormType(prevState => prevState === 'register' ? 'login' : 'register')
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register'
            ? <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm/>
              <p>Already have account? <a role={'button'} className={'btn btn-primary mt-1'} onClick={toggleFormType}>Sign in</a></p>
            </>
            : <>
              <h3 className="mb-4">Login</h3>
              <LoginForm/>
              <p>Dont have account? <a role={'button'} className={'btn btn-primary mt-1'} onClick={toggleFormType}>Sign up</a></p>
            </>
          }
        </div>
      </div>
    </div>
  )
}
// Login.propTypes = {}

export default Login