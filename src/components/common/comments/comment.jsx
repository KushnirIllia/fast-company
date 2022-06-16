import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'

const Comment = ({ comment, userId, onRemoveComment }) => {
  const [userName, setUserName] = useState(null)
  useEffect(() => {
    api.users.getById(userId).then(({ name }) => setUserName(name))
  }, [])
  if (userName !== null) {
    return (
      <div className="bg-light card-body  mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start ">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1 ">{userName}</p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={onRemoveComment}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
Comment.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.string,
  onRemoveComment: PropTypes.func
}

export default Comment
