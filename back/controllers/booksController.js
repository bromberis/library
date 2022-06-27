const Books = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await Books.create({
      title: req.body.title,
      author: req.body.author,
      information: req.body.information,
      category: req.body.category,
      year: req.body.year,
    });
    res.status(200).json({
      status: "success",
      data: newBook,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.updateBook = async (req, res) => {
    try {
        const book = await Books.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
        );

        res.status(200).json({
        status: "success",
        data: {
            book: book,
        },
        });
    } catch (err) {
        res.status(404).json({
        status: "fail",
        message: err,
        });
    }
    };

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Books.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: deletedBook,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};