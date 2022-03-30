import React from 'react'
const Quality = (props) => {
  let propsClass = `badge bg-${props.color} me-2`
  return <span className={propsClass}>{props.name}</span>
}
export default Quality
