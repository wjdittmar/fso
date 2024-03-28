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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");

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

  const handleNewBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      author: author,
      title: title,
      url: url
    };

    blogService.create(blogObject).then(res => {
      notify(`${res.title} by ${res.author} has been added`)
      setBlogs(blogs.concat(res))
    }).catch(error => {
      notify(`Error: ${error}`)
    });
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
        <LoginForm username={username} setUsername={setUsername} setUser={setUser} password={password} setPassword={setPassword} setErrorMessage={notifyError} /> :
        <>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <AddBlog handleNewBlog={handleNewBlog} author={author} setAuthor={setAuthor} url={url} setURL={setURL} title={title} setTitle={setTitle} />
          </Togglable>
          <Blogs blogs={blogs} name={user.name} setUser={setUser} />
        </>
      }
    </div>
  );
}


export default App