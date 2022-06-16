import React, { useEffect, useState } from 'react'
import SelectField from '../common/form/selectField'
import api from '../../api'
import AreaField from '../common/form/areaField'
import { validator } from '../../utils/validator'
import PropTypes from 'prop-types'

const dataInitialState = { user: '', text: '' }
const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(dataInitialState)
  const [errors, setErrors] = useState({})
  const [profession, setProfession] = useState([])
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfession(professionsList)
    })
  }, [])

  const validatorConfig = {
    text: {
      isRequired: {
        message: 'Message is required'
      }
    },
    user: {
      isRequired: {
        message: 'User is required'
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }
    const { user, text } = data
    const commentData = {
      userId: user,
      content: text
    }
    onSubmit(commentData)
    setData(dataInitialState)
    setErrors({})
  }
  return (
    profession && (
      <>
        <div className="card mb-2">
          <form className="card-body" onSubmit={handleSubmit}>
            <SelectField
              label={'New comment'}
              defaultOption={'Виберіть користувача'}
              value={data.user}
              name={'user'}
              onChange={handleChange}
              options={profession}
              error={errors.user}
            />
            <AreaField
              label={'Message'}
              onChange={handleChange}
              name={'text'}
              value={data.text}
              error={errors.text}
            />
            <button
              type="submit"
              className="btn btn-primary w-25 mx-auto mt-2"
              disabled={!isValid}
            >
              Add Comment
            </button>
          </form>
        </div>
      </>
    )
  )
}
CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
// {/*<h2>New comment</h2>*/}
// {/*<hr/>*/}
export default CommentForm
