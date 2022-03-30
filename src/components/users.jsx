import React from 'react'
import User from './user'

const Users = ({users, ...rest}) => {
  if (users.length > 0 ) {
    return <>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Ім'я</th>
          <th scope="col">Якості</th>
          <th scope="col">Професія</th>
          <th scope="col">Зустрівся(кільк. раз)</th>
          <th scope="col">Оцінка</th>
          <th scope="col"/>
          <th scope="col"/>
        </tr>
        </thead>
        <tbody>
          {users.map(user => <User key={user._id} {...rest} {...user}/>)}
        </tbody>
      </table>
    </>
  }
}
export default Users
