const Url = require('../databasee/model/urlschema');

exports.urlCreate = async (req) => {
    const { userId, origUrl } = req.body;

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const allurl = await Url.find();
    let newshorty = makeid(5);
    allurl.map((el) => {
        if (newshorty == el.shortUrl) {
            newshorty = makeid(5);
            shalgah();
        }
    });
    const shalgah = () => {
        allurl.map((el) => {
            if (newshorty == el.shortUrl) {
                newshorty = makeid(5);
            }
        });
    };

    const result = await new Url({
        userId: userId,
        origUrl: origUrl,
        shortUrl: newshorty,
    }).save();
    return newshorty;
};

exports.getidUrlQueary = async (req) => {
    const { userId } = req.params;
    const get = await Url.find();
    let heh;
    get.map((el) => {
        console.log(el);
        if (el.shortUrl == userId) {
            heh = el.origUrl;
        }
    });
    return heh;
};

exports.historyUrlQueary = async (req) => {
    const { userId } = req.params;
    const get = await Url.find();
    let heh = [];
    get.map((el) => {
        if (el.userId == userId) {
            heh.push(el);
        }
    });
    return heh;
};
