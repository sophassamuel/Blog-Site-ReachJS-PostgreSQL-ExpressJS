const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sequelize = require("./config/connections"); // Adjust the path as needed
const Post = require('./models/Post'); // Adjust the path as needed
const { htmlToText } = require('html-to-text');

const app = express();
const uploadMiddleware = multer({ dest: 'uploads/' });

// Use CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { file, body } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, path: tempPath } = file;
        const ext = path.extname(originalname);
        const newPath = tempPath + ext;

        // Rename the file
        fs.renameSync(tempPath, newPath);

        const { title, summary, content, category, author } = body;
        const plainTextContent = htmlToText(content);

        // Save the post to the database using Sequelize
        const postDocument = await Post.create({
            title,
            summary,
            content: plainTextContent,
            category,
            author,
            cover: newPath,
        });

        res.json({ postDocument });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the post' });
    }
});

app.get('/post', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
            limit: 20,
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postDoc = await Post.findByPk(parseInt(id, 10));
        if (postDoc) {
            res.json(postDoc);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the post' });
    }
});

app.delete('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postId = parseInt(id, 10); // Ensure id is an integer
        const postDoc = await Post.findByPk(postId);

        if (postDoc) {
            await Post.destroy({ where: { id: postId } });
            res.status(204).send(); // No content to return after successful deletion
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
