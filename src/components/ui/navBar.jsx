import React from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

const NavBar = () => {
  return (
    <ul className="nav w-100">
      <li className="nav-item">
        <Link className="nav-link" to={'/'}>Main Page</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={'/login'}>Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={'/users'}>Users</Link>
      </li>
    </ul>
  )
}
// NavBar.propTypes = {}
export default NavBar