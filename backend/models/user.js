import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['Patient', 'Admin', 'Physician', 'Staff'],
      required: true,
    },
  }
  // Add other fields here as needed
);

const User = mongoose.model('User', userSchema);

export default User;
