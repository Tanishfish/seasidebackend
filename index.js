const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const sliderRouter = require('./Router/slider.route');
const blogRouter = require('./Router/blog.route');
const formRouter = require('./Router/form.route');
const contentRouter = require('./Router/content.route');

// if (process.env.NODE_ENV === 'development') {
//     require('dotenv').config();
// }


const app = express();
const PORT = process.env.DB_PORT || 4321;

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'Api Created Successfully',
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
