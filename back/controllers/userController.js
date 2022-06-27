const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await Users.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    var result = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      items: req.body.items,
    });

    const token = jwt.sign({ id: result._id }, "labas", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "success",
      data: {
        user: result,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getEmail = async (req, res) => {
  console.log(req.query);
  try {
    const user = await Users.exists(req.query);

    res.status(200).json({
      status: "success",
      results: user.length,
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Neįvestas prisijungimo vardas arba slaptažodis.",
    });
  }
  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(404).json({
      status: "fail",
      message: "Neteisingas prisijungimo vardas arba slaptažodis",
    });
  }

  const token = jwt.sign({ id: user._id }, "labas", {
    expiresIn: "90d",
  });

  res.status(200).json({
    status: "success",
    token: token,
    user: user,
  });
};

exports.getAllUserItems = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { items } = users[0];

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        items: items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.createUserBook = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const updatedItems = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reservedBooks: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        books: updatedItems,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.findItemAndUpdate = async (req, res) => {
//   console.log(req.params.id);
//   console.log(req.params.subID);
//   console.log(req.body);
//   try {
//     const updateItem = await Users.findOneAndUpdate(
//       { _id: req.params.id, "items._id": req.params.subID },
//       {
//         $set: {
//           "items.$.name": req.body.name,
//           "items.$.category": req.body.category,
//           "items.$.date": req.body.date,
//         },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         items: updateItem,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// exports.findItemAndDelete = async (req, res) => {
//   try {
//     await Users.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $pull: {
//           items: { _id: req.params.subID },
//         },
//       }
//     );
//     res.status(200).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
