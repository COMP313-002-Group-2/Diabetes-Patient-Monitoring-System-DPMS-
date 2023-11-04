const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost/contactinfo';

// Middleware
app.use(bodyParser.json());

// Mongoose setup
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving form data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
