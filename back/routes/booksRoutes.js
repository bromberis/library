const express = require("express");

const { 
    getAllBooks, 
    createBook, 
    updateBook,
    deleteBook,
} = require("../controllers/booksController");

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/delete/:id").get(deleteBook)
router.route("/update/:id").patch(updateBook);

module.exports = router;


