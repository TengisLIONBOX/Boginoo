const { urlCreate, getidUrlQueary } = require('../__query__/urlquery');
const Url = require('../databasee/model/urlschema');

exports.urlPostController = async (req, res) => {
    try {
        const result = await urlCreate(req);
        res.status(201).send(result);
    } catch (err) {
        return res.status(400).json({
            message: 'Cannot create new url!',
        });
    }
};

exports.urlGetController = async (req, res) => {
    const result = await Url.find({});
    res.status(200).send(result);
};

exports.getIdUrl = async (req, res) => {
    try {
        const resu = await getidUrlQueary(req);
        res.status(201).send(resu);
    } catch (err) {
        res.status(403).send(err.message);
        console.log(err.message);
    }
};

exports.urlGetController2 = async (req, res) => {
    const { userId } = req.params;
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const get = await Url.find();
    let heh = [];
    get.map((el) => {
        if (el.userId == userId) {
            heh.push(el);
        }
    });
    let finish = heh.reverse();
    const result = finish.slice(startIndex, endIndex);

    res.json(result);
};
