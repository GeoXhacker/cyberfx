const fs = require('fs')
var notsent = fs.createWriteStream("notsent.txt");
const failed = ["am", "the", "king"]
failed.forEach(value => notsent.write(`${value}\n`));
