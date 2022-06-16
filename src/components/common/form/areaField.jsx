import React from 'react'
import PropTypes from 'prop-types'

const AreaField = ({ label, value, name, onChange, error }) => {
  const id = '_' + Math.random().toString(36).substr(2, 9)
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id}
        rows="3"
        value={value}
        name={name}
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
AreaField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default AreaField
