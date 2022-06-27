const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 80,
    },
    author: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 80,
    },
    category: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      maxLength: 80,
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
  },
  { timestamps: true }
);

const Books = new mongoose.model('Books', bookSchema);

const testBooks = new Books({
  title: 'Anne Snow',
  author: 'John Snow',
  category: 'novelė',
  information: 'Pulicerio premija',
  year: 2022,
});

// testBooks.save();

module.exports = Books;
