import React from 'react'
import Bookmark from './bookmark'
import Quality from './quality'
import PropTypes from 'prop-types'

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark
}) => {
  return <tr>
    <th scope="row">{name}</th>
    <td>
      {qualities.map(quality => (
        <Quality key={quality._id} {...quality}/>
      ))}
    </td>
    <td key={profession._id}>{profession.name}</td>
    <td>{completedMeetings}</td>
    <td>{rate}</td>
    <td><Bookmark status={bookmark} onClick={() => onToggleBookmark(_id)}/></td>
    <td>
      <button className="btn btn-danger" onClick={() => onDelete(_id)}>Delete</button>
    </td>
  </tr>
}
User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}
export default User
