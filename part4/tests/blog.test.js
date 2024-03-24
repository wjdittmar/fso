const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = listHelper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
})

describe('total likes', () => {

    test('check that total likes is working', () => {
        const result = listHelper.totalLikes(listHelper.initialBlogs)
        assert.strictEqual(result, 36)
    })
})

describe('most likes', () => {
    test('get most liked blog', () => {
        const result = listHelper.favoriteBlog(listHelper.initialBlogs)
        assert.deepStrictEqual(result, listHelper.initialBlogs[2]);
    });
    test('get author with most blogs', () => {
        const result = listHelper.mostBlogs(listHelper.initialBlogs)
        assert.strictEqual(result, "Robert C. Martin");
    });
    test('get most liked blogger', () => {
        const result = listHelper.mostLikes(listHelper.initialBlogs);
        assert.strictEqual(result, "Edsger W. Dijkstra");
    })

});

describe('testing API calls', () => {
    test('test GET -- there should be six blogs', async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, 6)
    })
    test('test that the blog object has the id field', async () => {
        const response = await api.get('/api/blogs');
        assert("id" in response.body[0]);
    })
    test('test POST -- there should be seven blogs', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d17f8",
            title: "Type wars 2",
            author: "Robert Chang",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 3,
            __v: 0
        };
        const response = await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const allBlogs = await listHelper.getAllBlogs();
        assert.strictEqual(allBlogs.length, listHelper.initialBlogs.length + 1)

        const contents = allBlogs.map(n => n.id)
        assert(contents.includes("5a422a851b54a676234d17f8"));
    })

    test('test POST without likes -- they should default to 0', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d17f8",
            title: "Type wars 2",
            author: "Robert Chang",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            __v: 0
        };
        const response = await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        assert(response.body.likes == 0);
    });

    test('test POST without title -- should return 400 bad request', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d17f8",
            author: "Robert Chang",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            __v: 0
        };

        const response = await api.post('/api/blogs').send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        // make sure that it was not added
        const allBlogs = await listHelper.getAllBlogs();
        assert.strictEqual(allBlogs.length, listHelper.initialBlogs.length)

    })

    test('test POST without url -- should return 400 bad request', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d17f8",
            title: "Type wars 2",
            author: "Robert Chang",
            __v: 0
        };
        const response = await api.post('/api/blogs').send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        // make sure that it was not added
        const allBlogs = await listHelper.getAllBlogs();
        assert.strictEqual(allBlogs.length, listHelper.initialBlogs.length)
    })



});

after(async () => {
    await mongoose.connection.close()
})