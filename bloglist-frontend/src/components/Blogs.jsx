import Blog from './Blog'
const Blogs = ({ blogs, name }) => (
    <div>
        <h2>blogs</h2>
        <p> {name} is logged in</p> <button> logout</button>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default Blogs