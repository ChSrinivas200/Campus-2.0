const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  author: {
    type: String,
    required: true,
    trim: true,
    default: 'Anonymous Student'
  },
  department: {
    type: String,
    default: 'General'
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DiscussionSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    default: 'Student Delegate'
  },
  regdNo: {
    type: String,
    trim: true,
    default: ''
  },
  department: {
    type: String,
    default: 'CSE'
  },
  tag: {
    type: String,
    enum: ['General', 'Find Teammates', 'Questions & Help', 'Cultural & Sports', 'Student Buzz'],
    default: 'General'
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [ReplySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
