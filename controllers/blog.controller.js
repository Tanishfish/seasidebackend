const connectDatabase = require('../config/DBconfig');

const getAllBlog = async (req, res) => {
    try {  
        await connectDatabase.query("SELECT * FROM blog", (error, data) => {
            if (error) console.log(error);
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        });
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            error: error.message,
        });
    }
};

module.exports = { getAllBlog }