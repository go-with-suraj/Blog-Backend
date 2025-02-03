import {test, after, beforeEach} from 'node:test'
import app from '../app.js'
import supertest from 'supertest'
import assert from 'node:assert'
import mongoose from 'mongoose'
import Blog from '../models/blog.js'
import helper from './test_helper.js'

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test.only('blogs are returned as json', async () => {
   const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test.only('unique identifier of blog posts is name id', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    response.body.forEach(blog => {
        assert.ok(blog.id, 'BLog post does not have an "id" field')
        assert.strictEqual(blog._id, undefined, 'Blog post should not have an "_id" field')
    });
})

test.only('a valid blog can be added',  async () => {
    const newBlog = {
        title: 'what is the title?',
        author: 'who is author?',
        url: 'http://example.com/',
        likes: 1
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const blogsDetail = blogsAtEnd.map(r => r.title)
    assert(blogsDetail.includes('what is the title?'))
})

test.only('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
        title: "A blog without likes",
        author: "Test Author",
        url: "http://example.com" 
    }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
 
    
    assert.deepStrictEqual(response.body.likes, 0, 'Likes should default to 0')
})

test.only('blog without title or url is not added', async () => {
    const newBlog = {
        author: "Edsger W. Dijkstra",
        likes: 4 
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})