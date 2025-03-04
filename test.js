const storageConfig = require('./src/Configuration/StorageConfig');
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

const port = process.env.PORT || 5000;

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/files', (req, res) => {
    const batch = '_28';
    const semester = '_4-1';
    const course = '_dip';
    const title = '_noteTrisha';

    const directoryPath = path.join(__dirname, 'images');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan directory' });
        }

        // Filter files based on query parameters
        const filteredFiles = files.filter(file => {
            let isMatch = true;
            if (batch) isMatch = isMatch && file.includes(`${batch}`);
            if (semester) isMatch = isMatch && file.includes(`${semester}`);
            if (course) isMatch = isMatch && file.includes(`${course}`);
            if (title) isMatch = isMatch && file.includes(`${title}`);
            return isMatch;
        });

        // Map filenames to URLs
        const imageUrls = filteredFiles.map(file => ({
            filename: file,
            url: `${req.protocol}://${req.get('host')}/images/${file}`
        }));

        res.json(imageUrls);
    });
});


app.post('/upload', storageConfig.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
});
