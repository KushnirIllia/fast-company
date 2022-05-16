import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import api from '../../../api'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import _ from 'lodash'
import SearchField from '../../common/searchField'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [users, setUsers] = useState()
  const [searchField, setSearchField] = useState()
  // const [selectedUser, setSelectedUser] = useState()
  const pageSize = 5
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
  useEffect(() => {
    setSelectedProf()
  }, [searchField])
  // useEffect(() => {
  // }, [searchField])
  // useEffect(() => {
  //   if (userId) {
  //     api.users.getUserById(userId).then(selectedUser =>
  //       setSelectedUser(selectedUser)
  //     )
  //   }
  // }, [currentPage])
  const handleSetSearchItem = ({ target }) => {
    setSearchField(target.value)
    console.log(searchField)
  }
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
    let filteredUsers
    if (searchField) {
      filteredUsers = searchField ? users.filter(user => user.name.toLowerCase().includes(searchField)) : users
    } else {
      filteredUsers = selectedProf ? users.filter(user => user.profession._id === selectedProf._id) : users
    }
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    return (
      <>
        <div className="d-flex p-3">
          {professions &&
          <div className="d-flex flex-column w-auto pe-3">
            <GroupList items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf}/>
            <button onClick={clearFilter} className="btn btn-secondary">Clear</button>
          </div>
          }
          <div className="d-flex flex-column">
            <SearchStatus length={count}/>
            <SearchField onChangeSearchInput={handleSetSearchItem}/>
            {count > 0 && (
              <UsersTable users={userCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete}
                          onToggleBookmark={handleToggleBookmark}/>
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
      </>
    )
  }
  return 'loading...'
}

export default UsersListPage
