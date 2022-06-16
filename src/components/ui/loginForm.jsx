import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBox from '../common/form/checkBox'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
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
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(data)
    const isValid = validate()
    if (!isValid) {
      return
    }
  }
  return (

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
        error={errors.password}/>
      <CheckBox value={data.stayOn} name={'stayOn'} onChange={handleChange}>Stay in the system</CheckBox>
      <button type={'submit'} className="btn btn-primary w-100" disabled={!isValid}>Submit</button>
    </form>
  )
}

export default LoginForm