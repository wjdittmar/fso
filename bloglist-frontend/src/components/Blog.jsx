import { useState } from 'react'
import storageService from '../services/storage'
const Blog = ({ blog, handleVote, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 12,
    paddingBottom: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5
  }

  const buttonStyle = {
    border: "none",
    height: "50%",
    color: "#333333",
    backgroundColor: "rgba(51, 51, 51, 0.05)",
    paddingTop: 10,
    borderRadius: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: "center",
    textDecoration: "none",
    display: "inlineBlock",
    fontSize: 14
  }

  const shortStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  }

  const longStyle = {
    display: "flex",
    justifyContent: "space-around"
  }

  const longElement = {
    width: "75%",
    display: "inline"
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const canRemove = blog.user ? blog.user.username === storageService.me() : true;

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div style={shortStyle}>
          <div style={{ width: "75%" }}>{blog.title} by: {blog.author}</div>
          <button style={buttonStyle} onClick={toggleVisibility}> view</button>
        </div>
      </div>
      <div style={showWhenVisible} >
        <div style={longStyle}>
          <div style={longElement}>
            <div>Title: {blog.title}</div>
            <div>Author: {blog.author}</div>
            <div>URL: {blog.url}</div>
            <div>Likes: {blog.likes} <button style={buttonStyle} onClick={() => handleVote(blog)}> like</button></div>
            <div>{blog.user ? blog.user.name : null}</div>
            {canRemove && <div><button style={buttonStyle} onClick={() => handleDelete(blog)}>delete entry</button></div>}
          </div>
          <button style={buttonStyle} onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </div >

  );
}

export default Blog