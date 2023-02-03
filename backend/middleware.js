const { TokenChecker } = require('./__helper__/helper');

exports.TokenCheckerMiddleware = async (req, res, next) => {
    try {
        console.log(req?.headers?.authorization);
        const token = req?.headers?.authorization.split(' ')[1];
        console.log(token);
        if (!token) {
            res.status(401).send({ message: 'No Token provided!' });
            return;
        }

        const secret = 'lol123';
        const result = await TokenChecker({ token, secret });

        if (result === 'Expired Token') {
            res.status(401).send({ message: 'Your token is expired!' });
            return;
        } else if (result.uid) {
            next();
            return;
        }
    } catch (err) {
        res.send('Token chin buruu baina');
        console.log(err.message);
    }
};
