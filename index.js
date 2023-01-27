const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const apiId = 20832738;
const apiHash = "d747ebdf7088764b1dd671256125b51f";
const stringSession = new StringSession(
	"1BAAOMTQ5LjE1NC4xNjcuOTEAUKWFSWqYhoiwDLLJhcxFVEOPTnXTtG0pk+7c54T5SW6ZbuURKr6qXNGfYhsoIdhz3KFygSnD54ew8gM/JF/7IkdJr96CvN5RKCYQbEprVEliISiQP5QOBS5r+HEVrtiFm9KQ9kvcLdFXlxdt73xy8mJ9cenaOpjoQKx0yS0qex6CPlYoZ97Z1LTKFWVdTZCyqeuM8pcdG6UGU1F6gz4W4DYt9C0yeoDso6mhQNzAIzF5cknabcrQUDGeW72tzNQT3OTcV4UFzSY4iVfnBqeBegkRNwGS4AdZ6R97TcuTKF66IiFxJijfBK3AnEXcQJvDDVsvwHSH6NfK/mwLgqpVDkM=",
); // fill this later with the value from session.save()
const options = {
	message: `This is Cyber forex  🚨Free forex signals 🚨

Tap link below to join a free main telegram channel for forex signals and setups 95% win rate 👇 

Channel : https://t.me/cyberfx001 


Recommeded forex broker with tight spreads , fast withdrawls and deposits 👇👇 exness 🚨

https://one.exness-track.com/a/odbkt7ssy3

Whatsapp: +256706551752 

Channel admin : @RichieCyberfx`,
};
var fs = require("fs");
var array = fs.readFileSync("list.txt").toString().split("\n");
// console.log(array);
const cron = require("node-cron");
var notsent = fs.createWriteStream("notsent.txt");

const failed = [];

(async () => {
	// loopThroughSplittedText(list,client)
	// console.log(client.session.save()); // Save this string to avoid logging in again
	// await client.sendMessage("geoxhacker", { message: "Hello! I hate you2" });
	// const result = await client.getEntity("geotestd");
	// 4955754305529970459n
	//  accessHash: Integer { value: 4955754305529970459n }

	//   const result = await client.invoke(
	// 		new Api.channels.InviteToChannel({
	// 			channel: "geotestd",
	// 			users: ["gitxyz2"],

	// 		}),
	// 	);
	const client = new TelegramClient(stringSession, apiId, apiHash, {
		connectionRetries: 5,
	});
	await client.start({
		phoneNumber: async () => await input.text("number ?"),
		password: async () => await input.text("password?"),
		phoneCode: async () => await input.text("Code ?"),
		onError: err => console.log(err),
	});

	console.log("You should now be connected.");
	// const reciepient = array[2].replace(/[.,"\s]/g, "");
	// await client.sendMessage("geoxhacker", options);

	cron.schedule("*/1 * * * *", function () {
		// console.log("connecting to telegram...");

		// client.connect()

		console.log("running a task every 1 minute");
		console.log(
			array.indexOf(array[1]),
			array[1].replace(/[.,"\s]/g, ""),
			"am here",
		);
		var file = fs.createWriteStream("list.txt");

		client
			.sendMessage(array[1].replace(/[.,"\s]/g, ""), options)
			.then(() => {
				console.log(array[1], "sent");
				array.splice(1, 1);
				file.on("error", function (err) {
					/* error handling */
					console.log(err);
					file.end();
				});
				array.forEach(value => file.write(`${value}\n`));
				// client.disconnect()
			})
			.catch(err => {
				console.log(array[1].replace(/[.,\s]/g), "failed");
				// fs.writeFileSync(
				// 	"notsent.txt",
				// 	`${array[1].replace(/[.,\s]/g, "")}\n`,
				// );
				failed.push(array[1].replace(/[.,\s]/g, ""));
				console.log(failed, "failed areray>>>>>>>>>>>>");
				array.splice(1, 1);
				array.forEach(value => file.write(`${value}\n`));

				failed.forEach(value => notsent.write(`${value}\n`));

				// client.disconnect()
			});
	});

	// client.disconnect();
})().catch(err => {
	console.log(err);
});
