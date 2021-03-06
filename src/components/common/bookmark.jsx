import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, onClick }) => {
  return <button onClick={onClick}>
    <i className={`bi bi-bookmark${status ? '-fill' : ''}`}/>
  </button>
}
Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}
export default Bookmark