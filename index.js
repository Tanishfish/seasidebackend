const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const sliderRouter = require('./Router/slider.route');
const blogRouter = require('./Router/blog.route');
const formRouter = require('./Router/form.route');
const contentRouter = require('./Router/content.route');
const path = require("path");

if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const app = express();
const PORT = 4321;

app.use(cors());

// Serve static files from the "downloads" directory
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

app.get("/api/listImages", (req, res) => {
    const uploadDirectory = path.join(__dirname, "downloads");
    const imageUrls = [];

    // Use the 'fs' module to read the files in the 'downloads' directory
    const fs = require("fs");

    fs.readdir(uploadDirectory, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Assuming all files in 'downloads' are images
        files.forEach((file) => {
            // Construct the URLs for the images
            const imageUrl = `/downloads/${file}`;
            imageUrls.push(imageUrl);
        });

        // Send the URLs as a JSON response
        res.json({ imageUrls });
    });
});


app.get('/', (req, res) => {
    res.json({
        msg: 'API Created Successfully',
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', sliderRouter);
app.use('/api', blogRouter);
app.use('/api', formRouter); // Use the formRouter for form submissions and file uploads
app.use('/api', contentRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server Running on http://localhost:${PORT}`);
    }
});
