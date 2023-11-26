const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://thedyson:centennial@cluster0.10i0q.mongodb.net/comp313data.contact?retryWrites=true&w=majority';


// Middleware
app.use(bodyParser.json());

// Mongoose setup
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  comments: String,
});

const Contact = mongoose.model('Contact', contactSchema, 'contact');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, comments } = req.body;

    const newContact = new Contact({ firstName, lastName, email, phoneNumber, comments });
    await newContact.save();

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving form data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
