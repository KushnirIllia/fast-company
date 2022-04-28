import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/userPage'
import UsersList from '../components/usersList'
// import PropTypes from 'prop-types'
const Users = () => {
  const params = useParams()
  const { userId } = params
  return userId ? <UserPage id={userId}/> : <UsersList />
}
// Users.propTypes = {}
export default Users