import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import User from './user'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api'
import SearchStatus from './searchStatus'

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 4
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
  }, [currentPage])
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }
  const clearFilter = () => {
    setSelectedProf()
  }
  const filteredUsers = selectedProf
    ? users.filter(user => {
      return user.profession._id === selectedProf._id
    })
    : users
  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)
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
          <table className="table">
            <thead>
            <tr>
              <th scope="col">Ім&apos;я</th>
              <th scope="col">Якості</th>
              <th scope="col">Професія</th>
              <th scope="col">Зустрівся(кільк. раз)</th>
              <th scope="col">Оцінка</th>
              <th scope="col"/>
              <th scope="col"/>
            </tr>
            </thead>
            <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
            </tbody>
          </table>
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
Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
