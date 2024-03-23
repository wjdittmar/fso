const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce(function (prev, current) {
        return (prev && prev.likes > current.likes) ? prev : current
    });
}

function groupByLikes(blogs) {
    const likesByAuthor = new Map();
    blogs.forEach((blog) => {
        const { author, likes } = blog;
        likesByAuthor.set(author, (likesByAuthor.get(author) || 0) + likes);
    });
    return likesByAuthor;
}

function groupByBlogs(blogs) {
    const blogsByAuthor = new Map();
    blogs.forEach((blog) => {
        const { author } = blog;
        blogsByAuthor.set(author, (blogsByAuthor.get(author) || 0) + 1);
    });
    return blogsByAuthor;
}

const mostBlogs = (blogs) => {
    const blogNumber = groupByBlogs(blogs);
    const max = [...blogNumber.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
    return max[0];
}

const mostLikes = (blogs) => {
    const res = groupByLikes(blogs);
    const max = [...res.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
    return max[0];
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}