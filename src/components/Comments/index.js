import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentList: initialCommentsList,
    name: '',
    comment: '',
    commentsCount: 0,
    logo: '',
  }

  onUserLogo = () => {
    const randomIndex = Math.floor(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )
    this.setState({logo: initialContainerBackgroundClassNames[randomIndex]})
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(eachItem => eachItem.id !== id),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  addComment = event => {
    event.preventDefault()
    this.onUserLogo()
    const {name, comment} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      postedAt: new Date(),
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      commentsCount: prevState.commentsCount + 1,
      name: '',
      comment: '',
    }))
  }

  inputName = event => {
    this.setState({name: event.target.value})
  }

  inputComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentList, commentsCount, logo} = this.state
    return (
      <>
        <div className="bg-container">
          <div className="top-container-alinement">
            <div className="card-container">
              <h1 className="page-title">Comments</h1>
              <p className="page-description">
                Say something about 4.0 Technologies
              </p>
              <form>
                <div className="input-element-container">
                  <input
                    value={name}
                    onChange={this.inputName}
                    className="name-input-element"
                    type="text"
                    placeholder="Your Name"
                  />
                  <textarea
                    value={comment}
                    onChange={this.inputComment}
                    placeholder="Your Comment"
                    className="comment-input-element"
                    rows="10"
                    cols="30"
                  />
                </div>
                <button
                  onClick={this.addComment}
                  type="submit"
                  className="add-comment-button"
                >
                  Add Comment
                </button>
              </form>
            </div>
            <div>
              <img
                className="top-right-img"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
              />
            </div>
          </div>
        </div>
        <hr className="hr" />
        <div className="comment-container">
          <div className="comment-alinement">
            <div className="comment-count">{commentsCount}</div>
            <p className="comments-text">Comments</p>
          </div>
        </div>
        <ul className="comments-container">
          {commentList.map(eachItem => (
            <CommentItem
              logo={logo}
              onDeleteComment={this.onDeleteComment}
              onLikeComment={this.onLikeComment}
              eachItem={eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
      </>
    )
  }
}

export default Comments
