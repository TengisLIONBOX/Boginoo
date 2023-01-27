const {
  userCreate,
  userDelete,
  usergetbyid,
  userUpdate,
} = require("../query/userquery");
const User = require("../databasee/model/userschema");
const { TokenGenerator } = require("../helper/helper");
const bcrypt = require("bcrypt");

exports.userPostController = async (req, res) => {
  try {
    await userCreate(req);
    res.status(201).send("Successfully created new user");
  } catch (err) {
    return res.status(403).json({
      msg: "User already exists",
    });
  }
};

exports.userDeleteController = async (req, res) => {
  try {
    const result = await userDelete(req, res);
    res.status(201).send({ Deleted: result });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: null,
    });
  }
};

exports.userGetController = async (req, res) => {
  const result = await User.find();
  res.status(200).send(result);
};

exports.userGetControllerById = async (req, res) => {
  const { id } = req.params;
  const objId = new mongoose.Types.ObjectId(id);
  const result = await User.findById({ _id: objId });
  res.send({ username: result });
};
exports.userUpdateController = async (req, res) => {
  try {
    const result = await userUpdate(req);
    res.send({ result });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

exports.userGetControllerById = async (req, res) => {
  const result = await usergetbyid(req);
  res.send({ data: result });
};

exports.userLogin = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });

  const hashaa = await bcrypt.compare(password, user.password);
  if (!user) {
    return " You don't have any user account, please sign up ";
  }
  if (hashaa) {
    const token = await TokenGenerator({ uid: user._id, expires: 120 });
    if (token) res.send({ user: user, token: token });
    console.log(user._id.valueOf(), token);
    return [user._id.valueOf(), token];
  } else {
    res.send("Invalid password or email");
    console.log("Invalid password or email");
    return "Invalid password or email";
  }
};
