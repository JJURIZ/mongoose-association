require('dotenv').config()
const express = require('express')
const app = express();

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

const BlogPost = require('./models/blog.js');

mongoose.connect(`mongodb://localhost/mongooseassociation`)

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`)
})

db.on('error', (err) => {
    console.log(`Error`, err);
});

app.get('/', (req, res) => {
    res.send('Home Route, Backend')
})

app.get('/blog', (req, res) => {
    // One way to create a post
    BlogPost.create({ 
        title: 'Mongoose for all Mongoose', 
        body: 'This article covers why all mongeese should use mongoose to handle their MongoDB functions in Express'
    })
    // Another way to create blog post and save to database
    const post1 = new BlogPost({
        title: 'The Second Coming of Mongoose Blog Post',
        body: 'People thought Mongoose was done, but no, it is not.'
    })
    post1.save();
    res.send('Post completed!');
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})