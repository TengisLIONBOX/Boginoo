const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.MONGODB_ATLAS_URI;
console.log(('uri', connectionString));
exports.connectDatabse = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true,
        });
        console.log('successfully connected');
        return 'Mongoose connected';
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
};
