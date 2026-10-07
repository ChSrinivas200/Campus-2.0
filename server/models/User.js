const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
  },
  regdNo: {
    type: String,
    required: [true, 'College Registration Number is required'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'College Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Mobile Number is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  role: {
    type: String,
    default: 'student',
  },
  collegeName: {
    type: String,
    default: 'R.V.R. & J.C. College of Engineering',
  },
  yearOfStudy: {
    type: String,
    default: '2nd Year',
  },
  password: {
    type: String,
    default: '',
  },
  participationType: {
    type: String,
    required: true,
    enum: ['Solo', 'Team'],
    default: 'Solo',
  },
  teamName: {
    type: String,
    default: '',
  },
  events: {
    type: [String],
    default: [],
  },
  teamMembers: {
    type: [String],
    default: [],
  },
  ticketId: {
    type: String,
    unique: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
