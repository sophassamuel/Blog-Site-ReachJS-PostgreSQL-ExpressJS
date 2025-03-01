const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sequelize = require("./config/connections");
const Post = require('./models/Post');
const { htmlToText } = require('html-to-text');
const app = express();

const uploadMiddleware = multer({
    dest: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { file, body } = req;
        const postData = JSON.parse(body.postData);
        const { title, summary, content, category, author } = postData;
        if (!title || !summary || !content || !category || !author) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const plainTextContent = htmlToText(content);
        let coverPath = null;
        if (file) {
            const { originalname, path: tempPath } = file;
            const ext = path.extname(originalname);
            const newPath = path.join('/tmp', `${uuidv4()}${ext}`);
            fs.renameSync(tempPath, newPath);
            coverPath = newPath;
        }
        const postDocument = await Post.create({
            title,
            summary,
            content: plainTextContent,
            category,
            author,
            cover: coverPath,
        });
        res.status(201).json({ postDocument });
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while creating the post' });
    }
});

app.get('/api/post', async (req, res) => {
    try {
        const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
});

app.get('/api/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postDoc = await Post.findByPk(parseInt(id, 10));
        if (postDoc) {
            res.json(postDoc);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the post' });
    }
});

app.delete('/api/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postId = parseInt(id, 10);
        const postDoc = await Post.findByPk(postId);
        if (postDoc) {
            if (postDoc.cover) {
                fs.unlinkSync(postDoc.cover);
            }
            await Post.destroy({ where: { id: postId } });
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
});

app.put('/api/post/:id', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { id } = req.params;
        const postId = parseInt(id, 10);
        const postDoc = await Post.findByPk(postId);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const { title, summary, content, category, author } = req.body;
        if (!title || !summary || !content || !category || !author) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        let coverPath = postDoc.cover;
        if (req.file) {
            const { originalname, path: tempPath } = req.file;
            const ext = path.extname(originalname);
            const newPath = path.join('/tmp', `${uuidv4()}${ext}`);
            fs.renameSync(tempPath, newPath);
            if (coverPath) {
                fs.unlinkSync(coverPath);
            }
            coverPath = newPath;
        }
        await postDoc.update({
            title,
            summary,
            content: htmlToText(content),
            category,
            author,
            cover: coverPath,
        });
        res.status(200).json({ postDoc });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post' });
    }
});

module.exports = app;
