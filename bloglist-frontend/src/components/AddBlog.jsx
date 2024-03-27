const AddBlog = ({ handleNewBlog, author, setAuthor, url, setURL, title, setTitle }) => {
    return (
        <>
            <h2> create new </h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    Author:
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Title:
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        value={url}
                        onChange={({ target }) => setURL(target.value)}
                    />
                </div>
                <button type="submit">save</button>
            </form ></>);
}

export default AddBlog