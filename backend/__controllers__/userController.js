const { userCreate, userDelete, usergetbyid, userUpdate } = require('../__query__/userquery');
const User = require('../databasee/model/userschema');
const bcrypt = require('bcrypt');
const { TokenGenerator } = require('../__helper__/helper');
const mongoose = require('mongoose');

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
        await userDelete(req);
        res.status(201).send('Successfully deleted user!');
    } catch (error) {
        return res.status(400).send('Cannot delete user!');
    }
};

exports.userGetController = async (req, res) => {
    const result = await User.find({});
    res.status(200).send(result);
};

exports.userGetControllerById = async (req, res) => {
    const { id } = req.params;
    const objId = new mongoose.Types.ObjectId(id);
    const result = await User.findById({ _id: objId });
    res.status(201).send({ username: result });
};
exports.userUpdateController = async (req, res) => {
    try {
        const result = await userUpdate(req);
        res.status(200).send({ result });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.userGetControllerById = async (req, res) => {
    const result = await usergetbyid(req);
    res.status(201).send({ data: result });
};

exports.userLogin = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userGet = await User.findOne({ email: email });
        if (userGet !== null) {
            const user = await User.findOne({ email: email });

            const hashaa = await bcrypt.compare(password, user.password);
            if (hashaa) {
                const token = await TokenGenerator({ uid: user._id, expires: 240 });
                if (token) return res.status(201).send({ user: user, token: token });
            } else {
                res.status(400).send('Email or password are incorrect!');
            }
        } else {
            res.status(401).send('Email or password are incorrect!');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};
