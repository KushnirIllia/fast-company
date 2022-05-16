import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
  return length !== 0
    ? <span className="badge bg-primary">{length} з тобою тусане сьогодні</span>
    : <span className="badge bg-danger">З тобою ніхто не тусане сьогодні</span>
}
SearchStatus.propTypes = { length: PropTypes.number.isRequired }
export default SearchStatus