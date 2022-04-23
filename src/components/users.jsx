import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import GroupList from './groupList'
import api from '../api'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [users, setUsers] = useState()
  const pageSize = 6
  useEffect(() => {
    api.users.fetchAll().then(data => {
      setUsers(data)
    })
  }, [])
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
  }, [currentPage])
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(user => user._id !== userId))
  }
  const handleToggleBookmark = (userId) => {
    setUsers(users.map(user => {
      if (user._id === userId) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    }))
  }
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }
  const clearFilter = () => {
    setSelectedProf()
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  if (users) {
    const filteredUsers = selectedProf ? users.filter(user => user.profession._id === selectedProf._id) : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    return (
      <div className="d-flex">
        {professions &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf}/>
          <button onClick={clearFilter} className="btn btn-secondary me-2">Clear</button>
        </div>
        }
        <div className="d-flex flex-column">
          <SearchStatus length={count}/>
          {count > 0 && (
            <UsersTable users={userCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark}/>
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}

export default Users
