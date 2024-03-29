import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AddBlog from "./components/AddBlog"
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const [user, setUser] = useState(null)

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }
  const notifyError = (message, type = 'failure') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleNewBlog = (newBlog) => {

    blogFormRef.current.toggleVisibility();

    blogService.create(newBlog).then(res => {
      notify(`${res.title} by ${res.author} has been added`)
      setBlogs(blogs.concat(res))
    }).catch(error => {
      notify(`Error: ${error}`)
    });
  }

  const handleVote = async (prevBlog) => {

    const updatedBlog = await blogService.update(prevBlog.id, {
      ...prevBlog,
      likes: prevBlog.likes + 1
    })

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
    setBlogs(blogs.map(b => b.id === prevBlog.id ? updatedBlog : b))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm setUser={setUser} setErrorMessage={notifyError} /> :
        <>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <AddBlog createBlog={handleNewBlog} />
          </Togglable>
          <Blogs blogs={blogs} name={user.name} setUser={setUser} handleVote={handleVote} />
        </>
      }
    </div>
  );
}


export default App