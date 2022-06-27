const crypto = require("crypto");
const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");

const reservedBooksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    information: {
      type: String,
    },
   year: {
      type: Number,
      min: 1900,
      max: (new Date().getFullYear())+1,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 12,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 100,
    },
    role: { type: String, default: "user" },
    reservedBooks: [reservedBooksSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 8);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = new mongoose.model("Users", userSchema);

const testUsers = new Users({
  name: "Admin",
  email: "admin@gmail.com",
  password: "Jonas123456",
  role: "admin",
  reservedBooks: [
    { name: "Anne", date: "2022-05-23" },
  ],
});

// testUsers.save();

module.exports = Users;
