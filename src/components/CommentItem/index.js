import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachItem, onLikeComment, onDeleteComment, logo} = props
  const {id, name, comment, isLiked, postedAt} = eachItem

  const likeCommnet = () => {
    onLikeComment(id)
  }

  const deleteComment = () => {
    onDeleteComment(id)
  }

  const likeImgURL = !isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const timeAgo = formatDistanceToNow(new Date(postedAt), {addSuffix: true})

  return (
    <li>
      <div className="comment-name-paragraph">
        <div className="comment-name-logo-alinement">
          <div className={logo}>{name[0]}</div>
          <h1 className="comment-name">{name}</h1>
          <p>{timeAgo}</p>
        </div>
        <p className="comment">{comment}</p>
      </div>

      <div className="like-btn-delete-btn-alinement">
        <div className="like-container">
          <button className="like-btn" type="button" onClick={likeCommnet}>
            <img alt="like" className="like-btn-img" src={likeImgURL} />
          </button>
          <p>Like</p>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={deleteComment}
          data-testid="delete"
        >
          <img
            className="delete-btn-img"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
