import React, { useEffect, useState } from 'react'
// import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBox from '../common/form/checkBox'
import * as yup from 'yup'
// import PropTypes from 'prop-types'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    validate()
  }, [data])
  // const validatorConfig = {
  //   email: {
  //     isRequired:
  //       { message: 'Email is required' },
  //     isEmail:
  //       { message: 'Email is not correct' }
  //   },
  //   password: {
  //     isRequired:
  //       { message: 'Password is required' },
  //     isCapitalSymbol:
  //       { message: 'Password must have at least 1 capital letter' },
  //     isNumber:
  //       { message: 'Password must have at least 1 number' },
  //     min:
  //       {
  //         message: 'Password must have at least 8 symbols',
  //         value: 8
  //       }
  //   }
  // }
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const validateSchema = yup.object().shape({
    password: yup.string().required('Password is required')
    .matches(/(?=.*[A-Z])/, 'Password must have at least 1 capital letter')
    .matches(/(?=.*[0-9])/, 'Password must have at least 1 number')
    .matches(/(?=.*[!@#$%^&*])/, 'Password must have at least 1 symbol !@#$%^&*')
    .matches(/(?=.{8,})/, 'Password must have at least 8 symbols'),
    email: yup.string().required('Email is required').email('Email is not correct')
  })
  const validate = () => {
    // const errors = validator(data, validatorConfig)
    validateSchema.validate(data).then(() => setErrors(errors)).catch((err) => setErrors({ [err.path]: err.message }))
    // setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  // console.log(data)
  // console.log(errors)
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
// LoginForm.propTypes = {}

export default LoginForm