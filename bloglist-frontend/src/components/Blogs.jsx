import Blog from './Blog'
const Blogs = ({ blogs, handleVote }) => {

    const blogsStyle = {
        width: '45%'
    }
    return (
        <div style={blogsStyle}>

            <h2>blogs</h2>
            {
                blogs.sort((a, b) => a.likes - b.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} handleVote={handleVote} />
                )
            }
        </div >);
}

export default Blogs