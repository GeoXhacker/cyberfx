var fs = require("fs");
var array = fs.readFileSync("array.txt").toString().split("\n");
// console.log(array);
const cron = require("node-cron")


  cron.schedule("*/40 * * * * *", function () {
		console.log("running a task every 10 second");
var file = fs.createWriteStream("array.txt");

          console.log(array[1], "am here");
					array.splice(1, 1);
					file.on("error", function (err) {
						/* error handling */
						console.log(err);
					});
					array.forEach(value => file.write(`${value}\n`));
					file.end();
	});

