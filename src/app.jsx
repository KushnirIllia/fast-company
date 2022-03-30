import React, {useState} from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(user => user._id !== userId))
  }
  const toggleBookmark = (id) => {
    setUsers(users.map(u => {
      if (u._id === id) {
        return {...u, bookmark: !u.bookmark}
      }
      return u
    }))
  }
  return <div>
    <SearchStatus length={users.length}/>
    <Users onDelete={handleDelete} onToggleBookmark={toggleBookmark} users={users}/>
  </div>
}
export default App