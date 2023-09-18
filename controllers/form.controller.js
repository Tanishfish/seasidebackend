const multer = require("multer");
const path = require("path");
const connectDatabase = require("../config/DBconfig");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
        callback(null, file.fieldname + '-' + uniqueSuffix + ext); 
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

const uploadFields = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "photo2", maxCount: 1 },
  { name: "photo3", maxCount: 1 },
]);

const getformdata = async (req, res) => {
  try {
    await connectDatabase.query("SELECT * FROM childmodel", (error, data) => {
      if (error) {
        console.log("Error retrieving data from the database:", error);
        return res.status(500).json({
          status: "Failed",
          error: "Database query failed",
        });
      }
      console.log("Data retrieved from the database:", data);
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
  } catch (error) {
    console.log("Error in getformdata:", error);
    res.status(404).json({
      status: "Failed",
      error: error.message,
    });
  }
};

const formdata = async (req, res) => {
  try {
    
    
    
    //console.log("Received data from CL:", req.body);
    

    // return res.status(200).send(req.files.photo);

  
    uploadFields(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log('Multer Error:', err.message);
        return res.status(400).send('Multer Error: ' + err.message);
      } else if (err) {
        console.log('An error occurred:', err);
        return res.status(500).send('An error occurred.');
      }

      if (!req.files || !req.files.photo || !req.files.photo2 || !req.files.photo3) {
        return res.status(400).send('Please provide all required photos.');
      }

      const photoFilename = req.files.photo[0].filename;
      const photo2Filename = req.files.photo2[0].filename;
      const photo3Filename = req.files.photo3[0].filename;

      const {
        name,
        dob,
        parents_name,
        child_height,
        location,
        phone,
        email,
        school_details,
        special_talents,
        status,
      } = req.body;

      // Handle the uploaded file here, e.g., save it to a database or perform other operations

      // Define the SQL query with placeholders
      const addDataForm = `
      INSERT INTO childmodel (
        name, 
        dob, 
        parents_name, 
        child_height, 
        location, 
        phone, 
        email, 
        school_details, 
        special_talents, 
        photo,
        photo2,
        photo3,
        status
      ) VALUES (
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?,
        ?,
        ?, 
        ?
      )`;

      // Update the addValues array to include the filename of the uploaded image
      const addValues = [
        name,
        dob,
        parents_name,
        child_height,
        location,
        phone,
        email,
        school_details,
        special_talents,
        photoFilename,
        photo2Filename,
        photo3Filename,
        status,
      ];

      // Execute the SQL query
      await connectDatabase.query(addDataForm, addValues, (error, result) => {
        if (error) {
          console.error('Error inserting data into the database:', error);
          return res.status(500).json({
            status: "Failed",
            error: error.message
            ,
          });
        } else {
          console.log('Data inserted successfully:', result);
          // If the insertion is successful, you can respond with a success message
          res.status(200).json({
            status: "success",
            message: "Data Saved successfully",
            // You may include the inserted data here if needed
            data: {
              name,
              dob,
              parents_name,
              child_height,
              location,
              phone,
              email,
              school_details,
              special_talents,
              photo: photoFilename,
              photo2: photo2Filename,
              photo3: photo3Filename,
              status,
            },
          });
        }
      });
    });
  } catch (error) {
    console.log('Error in formdata:', error);
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

module.exports = { getformdata, formdata };
