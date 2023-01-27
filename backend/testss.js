const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(1);

const hash = bcrypt.hashSync("myPass", salt);

console.log(hash);
