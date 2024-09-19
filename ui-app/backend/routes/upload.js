const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');

const File = require('../models/Fileupload'); 

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

// Filter for CSV/Excel files
const fileFilter = (req, file, cb) => {
  const filetypes = /csv|xlsx|xls/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only CSV and Excel files are allowed!');
  }
};

const upload = multer({ storage, fileFilter });

// Upload route with file metadata saving
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  try {
    // Save file metadata in the database
    const newFile = new File({
      userId: req.user._id, // Assume user ID is available in req.user
      filename: req.file.filename,
      path: req.file.path,
    });
    await newFile.save();

    // Process file based on extension
    if (fileExtension === '.csv') {
      // Handle CSV file
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          res.json({
            message: 'CSV file uploaded, saved, and processed successfully!',
            file: req.file,
            data: results,
          });
        });
    } else if (fileExtension === '.xlsx' || fileExtension === '.xls') {
      // Handle Excel file
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      res.json({
        message: 'Excel file uploaded, saved, and processed successfully!',
        file: req.file,
        data,
      });
    } else {
      return res.status(400).send('Unsupported file type.');
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload and save file metadata.', error });
  }
});

router.get('/my-files', async (req, res) => {
    try {
      const userId = req.user._id; // Assuming you're using authentication and have user in req.user
      const files = await File.find({ userId: userId }); // Find files uploaded by the user
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch files', error });
    }
  });

module.exports = router;
