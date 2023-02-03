const { userCreate, userDelete, usergetbyid, userUpdate } = require('../__query__/userquery');
const User = require('../databasee/model/userschema');
const { TokenGenerator } = require('../__helper__/helper');
const bcrypt = require('bcrypt');

exports.userPostController = async (req, res) => {
    try {
        await userCreate(req);
        res.status(201).send('Successfully created new user!');
    } catch (err) {
        return res.status(400).json({
            message: 'Cannot create new user!',
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
        return res.status(404).send(" You don't have any user account, please sign up ");
    }
    if (hashaa) {
        // const token = await TokenGenerator({ uid: user._id, expires: 180 });
        // if (token) res.status(201).send({ user: user, token: token });
        // return [user._id.valueOf(), token];

        return res.status(201).send({ user: user });
        // [user._id.valueOf()];
    } else {
        res.status(400).send('Invalid password or email');
        console.log('Invalid password or email');
        return 'Invalid password or email';
    }
};
