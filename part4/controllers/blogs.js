const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({}).populate('user', { name: 1, username: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const users = await User.find({});
    const body = request.body
    // for now, just assign an arbitrary user to the note

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
        user: users[0].id
    })
    if (!blog.url) {
        return response.status(400).json({ error: "Missing URL" });
    }
    if (!blog.title) {
        return response.status(400).json({ error: "Missing title" });
    }
    const savedBlog = await blog.save();
    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    users[0].blogs = users[0].blogs.concat(savedBlog._id);

    await users[0].save()
    response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog);
});

module.exports = blogsRouter