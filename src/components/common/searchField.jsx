import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ onChangeSearchInput }) => {
  return (
    <div className="input-group mt-2 mb-2">
      <input type="text" className="form-control" placeholder="Search" onChange={onChangeSearchInput}/>
    </div>
  )
}
SearchField.propTypes = {
  onChangeSearchInput: PropTypes.func.isRequired
}

export default SearchField