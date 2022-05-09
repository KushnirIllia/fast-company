import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'
// import PropTypes from 'prop-types'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    validate()
  }, [data])
  const validatorConfig = {
    email: {
      isRequired:
        { message: 'Email is required' },
      isEmail:
        { message: 'Email is not correct' }
    },
    password: {
      isRequired:
        { message: 'Password is required' },
      isCapitalSymbol:
        { message: 'Password must have at least 1 capital letter' },
      isNumber:
        { message: 'Password must have at least 1 number' },
      min:
        {
          message: 'Password must have at least 8 symbols',
          value: 8
        }
    }
  }
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  // console.log(data)
  // console.log(errors)
  const handleSubmit = (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }
  }
  return (
    <div className={'container'}>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label={'Email'}
              type={'email'}
              name={'email'}
              value={data.email}
              onChange={handleChange}
              error={errors.email}/>
            <TextField
              label={'Password'}
              type={'password'}
              name={'password'}
              value={data.password}
              onChange={handleChange}
              er ror={errors.password}/>
            <button type={'submit'} className="btn btn-primary w-100" disabled={!isValid}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
// Login.propTypes = {}

export default Login