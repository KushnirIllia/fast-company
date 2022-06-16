import React from 'react'
import Loader from 'react-spinners/ScaleLoader'
// import PropTypes from 'prop-types'

const Loading = () => {
  return (
    <div className={'loader'}>
      <Loader loading={true} color={'red'} />
    </div>
  )
}
// Loading.propTypes = {}

export default Loading
