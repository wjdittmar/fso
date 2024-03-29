import Blog from './Blog'
import blogService from '../services/blogs'
const Blogs = ({ blogs, name, setUser, handleVote }) => {

    const blogsStyle = {
        width: '45%'
    }

    const handleLogout = async (event) => {
        window.localStorage.setItem(
            'loggedBlogappUser', ''
        )
        blogService.setToken('')
        setUser(null)
    }

    return (
        <div style={blogsStyle}>

            <p> {name} is logged in</p> <button onClick={handleLogout}> logout</button>
            <h2>blogs</h2>
            {
                blogs.sort((a, b) => a.likes - b.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} handleVote={handleVote} />
                )
            }
        </div >);
}

export default Blogs