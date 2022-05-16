import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelect from '../common/form/multiSelect'
import CheckBox from '../common/form/checkBox'
// import PropTypes from 'prop-types'

const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', profession: '', sex: 'male', qualities: [], licence: false })
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState([])
  const [errors, setErrors] = useState({})
  useEffect(() => {
    validate()
  }, [data])
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }
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
    },
    profession: {
      isRequired:
        { message: 'Profession is required' }
    },
    licence: {
      isRequired:
        { message: 'You should confirm license agreement' }
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
  // console.log(data)
  // console.log(errors)
  const handleSubmit = (event) => {
    console.log(data)
    event.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }
    const { profession, qualities } = data
    console.log({
      ...data,
      professions: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
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
      {professions && <SelectField
        label={'Profession'}
        className={'form-select'}
        defaultOption={'Choose'}
        value={data.profession}
        onChange={handleChange}
        name={'profession'}
        options={professions}
        error={errors.profession}/>
      }
      <RadioField
        options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
        value={data.sex}
        name={'sex'}
        onChange={handleChange}
        label={'Sex'}
      />
      <MultiSelect
        onChange={handleChange}
        defaultValue={data.qualities}
        options={qualities}
        name={'qualities'}
        label={'Qualities'}
      />
      <CheckBox value={data.licence} name={'licence'} onChange={handleChange} error={errors.licence}>Confirm the <a>license agreement</a></CheckBox>
      <button type={'submit'} className="btn btn-primary w-100" disabled={!isValid}>Submit</button>
    </form>
  )
}
// RegisterForm.propTypes = {}

export default RegisterForm