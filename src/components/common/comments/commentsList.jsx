import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import api from '../../../api'
import Comment from './comment'
import { useParams } from 'react-router-dom'
import Loading from '../loading'
import CommentForm from '../../ui/commentForm'

const CommentsList = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState([])
  useEffect(() => {
    if (userId) {
      api.comments
        .fetchCommentsForUser(userId)
        .then((data) => setComments(data))
    }
  }, [])
  const handleDeleteComment = async (id) => {
    await api.comments.remove(id).then(() => {
      api.comments
        .fetchCommentsForUser(userId)
        .then((data) => setComments(data))
    })
  }
  const handleAddComment = async (data) => {
    try {
      await api.comments
        .add({ ...data, pageId: userId })
        .then((data) => setComments((prevState) => [...prevState, data]))
    } catch (e) {
      console.error(e)
    }
  }
  return comments ? (
    <>
      <CommentForm pageId={userId} onSubmit={handleAddComment} />
      {comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
              <Comment
                comment={comment}
                userId={comment.userId}
                key={comment._id}
                onRemoveComment={() => handleDeleteComment(comment._id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  ) : (
    <Loading />
  )
}
// CommentsList.propTypes = {}

export default CommentsList
