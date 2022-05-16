import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ color, name }) => {
  const propsClass = `badge bg-${color} me-2`
  return <span className={propsClass}>{name}</span>
}
Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
export default Quality
