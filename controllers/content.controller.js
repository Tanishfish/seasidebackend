const connectDatabase = require('../config/DBconfig');

const getAllContent = async (req, res) => {
    try {  
        await connectDatabase.query("SELECT * FROM content", (error, data) => {
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

const getSpecificContent = async (req, res) => {                                                                                                                                                                                            
    console.log("Function called"); 
    console.log("Request params:", req.params);
    try {
        const id = req.params.id;
        
        // Check if id is a valid integer
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({
                status: "Failed",
                error: "Invalid id parameter",
            });
        }
          
        console.log("Received id:", id);

        await connectDatabase.query('SELECT * FROM content WHERE id = ?', [id], (error, data) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    status: "Failed",
                    error: "Database query error",
                });
            }
            
            
            const responseData = {
                id: id,
                data: data,
            };

            res.status(200).json({
                status: "success",
                length: data?.length,
                data: responseData,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            status: "Failed",
            error: error.message,
        });
    }
};


module.exports = { getAllContent, getSpecificContent}