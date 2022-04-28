import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'
import { useHistory } from 'react-router-dom'

const UserPage = ({ id }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    api.users.getUserById(id).then(data => setUser(data))
  }, [])

  const handleClick = () => {
    history.replace('/users')
  }
  if (user) {
    return (
      <div className='border border-secondary p-1 d-inline-block'>
        <h1>{user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities}/>
        <p>Rate: {user.rate}</p>
        <h4>Completed Meetings: {user.completedMeetings}</h4>
        <button onClick={handleClick}>All Users</button>
      </div>
    )
  } else {
    return 'loading...'
  }
}
UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage