import React, { useState } from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

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
  return <div>
    <SearchStatus length={users.length}/>
    <Users onDelete={handleDelete} onToggleBookmark={toggleBookmark} users={users}/>
  </div>
}
export default App