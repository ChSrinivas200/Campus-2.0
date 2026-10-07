const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  first: { type: String, default: '₹0' },
  second: { type: String, default: '₹0' },
  third: { type: String, default: '₹0' },
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    enum: ['Cultural', 'Sports', 'Digital Club', 'Tech'],
    required: true,
    default: 'Cultural',
  },
  category: {
    type: String,
    required: true,
  },
  genderCategory: {
    type: String,
    enum: ['All', 'Boys', 'Girls'],
    default: 'All',
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  prizes: {
    solo: prizeSchema,
    team: prizeSchema,
  },
  description: {
    type: String,
    required: true,
  },
  rules: {
    type: [String],
    default: [],
  },
  organizer: {
    type: String,
    default: 'Digital Club & Sports/Cultural Committee',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  iconName: {
    type: String,
    default: 'Sparkles',
  },
});

module.exports = mongoose.model('Event', eventSchema);
