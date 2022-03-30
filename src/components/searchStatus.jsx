import React from 'react'

const SearchStatus = (props) => {
  const {length} = props
  return length !== 0 ? <span className="badge bg-primary">{length} з тобою тусане сьогодні</span> :
    <span className="badge bg-danger">З тобою ніхто не тусане сьогодні</span>
}
export default SearchStatus