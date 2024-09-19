const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who uploaded
  filename: { type: String, required: true },
  path: { type: String, required: true }, // Path where the file is stored
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
