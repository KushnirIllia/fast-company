import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
  let newItems
  if (typeof items === 'object') {
    newItems = Object.values(items)
  } else {
    newItems = Object.keys(items)
  }
  return (
    <ul className="list-group">
      {newItems.map(item => (
         <li key={item[valueProperty]} className={`list-group-item ${item === selectedItem ? 'active' : ''}`}
            onClick={onItemSelect.bind(null, item)} role="button">{item[contentProperty]}</li>
      ))}
    </ul>
  )
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  selectedItem: PropTypes.object
}
export default GroupList