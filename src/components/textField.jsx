import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPass = () => {
    setShowPassword((prevState) => !prevState)
  }
  return (
    <div className="mb-4">
      <label className="" htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input className={`form-control ${error ? 'is-invalid' : 'is-valid'}`} type={showPassword ? 'text' : type} id={name} name={name} value={value}
               onChange={onChange}/>
        {type === 'password' &&
        <button className="btn btn-outline-secondary rounded" type="button" onClick={toggleShowPass}>
          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}/>
        </button>
        }
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}
TextField.defaultProps = {
  type: 'text'
}
TextField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
export default TextField