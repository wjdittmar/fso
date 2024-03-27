import Blog from './Blog'
import blogService from '../services/blogs'
const Blogs = ({ blogs, name, setUser }) => {
    const handleLogout = async (event) => {
        window.localStorage.setItem(
            'loggedBlogappUser', ''
        )
        blogService.setToken('')
        setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p> {name} is logged in</p> <button onClick={handleLogout}> logout</button>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div >);
}

export default Blogs