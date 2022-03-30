import React from 'react'
const Bookmark = ({status, onClick}) => {
  return <button onClick={onClick}>
    <i className={`bi bi-bookmark${status ? '-fill' : ''}`}/>
  </button>
}
export default Bookmark