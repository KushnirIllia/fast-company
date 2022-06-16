import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditForm from '../components/page/editUserPage'
// import PropTypes from 'prop-types'
const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  if (userId) {
    if (edit) {
      return <EditForm />
    }
    return <UserPage id={userId} />
  } else {
    return <UsersListPage />
  }
}
// Users.propTypes = {}
export default Users
