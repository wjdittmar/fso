import { useState } from 'react'
const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)


  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }
  if (blog.user[0]) {
    console.log(blog.user[0].name)
  }
  console.log(blog.user);

  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}> view</button>
      </div>
      <div style={showWhenVisible}>
        <div>Title: {blog.title}</div> <div>Author: {blog.author}</div> <div> URL: {blog.url}</div> <div>Likes: {blog.likes} <button> like</button></div> {blog.user[0] ? blog.user[0].name : null}
        <button onClick={toggleVisibility}>cancel</button>
      </div></>

  );
}

export default Blog