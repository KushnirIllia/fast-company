import React, { useState } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import User from './user'
import PropTypes from 'prop-types'

const Users = ({ users, ...rest }) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    console.log(pageIndex)
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(users, currentPage, pageSize)
  return (
    count > 0 && (
      <>
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
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    )
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
