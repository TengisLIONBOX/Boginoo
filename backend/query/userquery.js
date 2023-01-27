const User = require("../databasee/model/userschema");
const bcrypt = require("bcrypt");

exports.userCreate = async (req) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(1);
  const hash = bcrypt.hashSync(password, salt);
  const result = await new User({ password: hash, email: email }).save();
  return result;
};

exports.userDelete = async (req) => {
  const { userId } = req.params;
  const objId = new mongoose.Types.ObjectId(userId);
  await User.findByIdAndDelete({ _id: objId }, { new: true });
};

exports.userUpdate = async (req) => {
  const { userId } = req.params;
  const { password, email } = req.body;
  const salt = bcrypt.genSaltSync(1);

  const hash = bcrypt.hashSync(password, salt);

  const up = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: { password: hash, email: email },
    },
    { new: true }
  );
  return up;
};

exports.usergetbyid = async (req) => {
  const { id } = req.params;
  const objId = new mongoose.Types.ObjectId(id);
  await User.findById({ _id: objId });
};
