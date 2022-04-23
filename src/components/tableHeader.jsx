import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  // const handleCaretChange = () => {
  //   return selectedSort.order === 'asc' ? <i className="bi bi-caret-up-fill"/> : <i className="bi bi-caret-down-fill"/>
  // }
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }
  const renderSortArrow = (selSort, currentPath) => {
    return currentPath
      ? currentPath === selSort.path
        ? selSort.order === 'asc'
          ? <i className="bi bi-caret-up-fill"/>
          : <i className="bi bi-caret-down-fill"/>
        : undefined
      : undefined
  }
  return <thead>
  <tr>
    {Object.keys(columns).map(column => (
      <th key={column} onClick={columns[column].path ? handleSort.bind(null, columns[column].path) : undefined}
          scope="col" role={`${columns[column].path && 'button'}`}>
        {columns[column].name}
        {renderSortArrow(selectedSort, columns[column].path)}
      </th>
    ))}
  </tr>
  </thead>
}
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}
export default TableHeader