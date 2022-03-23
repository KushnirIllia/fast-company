import React, {useState} from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const deleteHandle = (userId) => {
    setUsers((prevState) => prevState.filter(user => user._id !== userId))
    // setUsers(users.filter(user => user._id !== userId))
  }
  const renderUsers = (usersArr) => {
    const renderQualities = (qualities) => {
      return qualities.map(quality => {
        let qualityClass = `badge bg-${quality.color} me-2`
        return <span key={quality._id} className={qualityClass}>{quality.name}</span>
      })
    }
    return usersArr.map(user => {
      return (
        <tr key={user?._id}>
          <th scope="row">{user?.name}</th>
          <td>{renderQualities(user?.qualities)}</td>
          <td key={user?.profession?._id}>{user?.profession?.name}</td>
          <td>{user?.completedMeetings}</td>
          <td>{user?.rate}</td>
          <td>
            <button className="btn btn-danger" onClick={() => deleteHandle(user?._id)}>Delete</button>
          </td>
        </tr>
      )
    })
  }
  const usersTable = <table className="table">
    <thead>
    <tr>
      <th scope="col">Ім'я</th>
      <th scope="col">Якості</th>
      <th scope="col">Професія</th>
      <th scope="col">Зустрівся(кільк. раз)</th>
      <th scope="col">Оцінка</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    {renderUsers(users)}
    </tbody>
  </table>
  return users.length !== 0 ?
    <><h1><span className="badge bg-primary">{users.length} з тобою тусане сьогодні</span></h1>{usersTable}</> :
    <h1><span className="badge bg-danger">З тобою ніхто не тусане сьогодні</span></h1>
}
export default Users