import React, { useState, useEffect } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState()
  useEffect(() => {
    api.users.fetchAll().then(data => {
      setUsers(data)
    })
  }, [])

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(user => user._id !== userId))
  }
  const toggleBookmark = (userId) => {
    setUsers(users.map(user => {
      if (user._id === userId) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    }))
  }
  return <>
    {users && <Users onDelete={handleDelete} onToggleBookmark={toggleBookmark} users={users}/>}
  </>
}
export default App