import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/bookmark'
import Qualities from './qualities'
import Table, { TableBody, TableHeader } from '../common/table'
import { Link } from 'react-router-dom'

const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark, onDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Ім`я', component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: 'Якості', component: (user) => <Qualities qualities={user.qualities}/> },
    professions: { path: 'profession.name', name: 'Професія' },
    completedMeetings: { path: 'completedMeetings', name: 'Кількість зустрічей' },
    rate: { path: 'rate', name: 'Оцінка' },
    bookmark: { name: 'Збережене', component: (user) => <Bookmark status={user.bookmark} onClick={() => onToggleBookmark(user._id)}/> },
    delete: {
      name: 'Дія', component: (user) => <button className="btn btn-danger" onClick={() => onDelete(user._id)}>Delete</button>
    }
  }
  return (
    <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
      <TableHeader {...{ onSort, selectedSort, columns }}/>
      <TableBody columns={columns} data={users}/>
    </Table>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
export default UsersTable