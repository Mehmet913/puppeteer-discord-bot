(async () => {
	var fs = require("fs");
	try {
		var puppeteer = require('puppeteer-core');
	} catch(e) {
		var puppeteer = require('puppeteer');
	}
	var browser = await puppeteer.launch({executablePath: fs.existsSync("/usr/bin/chromium-browser") ? "/usr/bin/chromium-browser" : undefined});

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	bot.login(fs.readFileSync('./token.txt','utf8'));

	var cmdPrefix = "p!";
	bot.on("message", async function(msg){
		if (!msg.content.startsWith(cmdPrefix)) return;

		var args = msg.content.split(" ");
		var cmd = args[0].slice(cmdPrefix.length).toLowerCase();
		var query = args.slice(1).join(" ");

		switch (cmd) {
			case "screenshot":
			case "ss":
				pup(msg, query);
				break;
			case "google":
			case "g":
				pup(msg, `https://www.google.com/search?q=${encodeURIComponent(query)}`);
				break;
			case "google-images":
			case "gi":
				pup(msg, `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`);
				break;
			case "bing":
			case "b":
				pup(msg, `https://www.bing.com/search?q=${encodeURIComponent(query)}`);
				break;
			case "bing-images":
			case "bi":
				pup(msg, `https://www.bing.com/images/search?q=${encodeURIComponent(query)}`);
				break;
			case "youtube":
			case "yt":
				pup(msg, `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
				break;
/*
			case "":
			case "":
				pup(msg, ``);
				break;
*/
		}


	});

	async function pup(message, url) {
		var page = await browser.newPage();
		await page.setViewport({width: 1440, height: 900});
		await page.goto(url);
		var screenshot = await page.screenshot({type: 'png'});
		message.channel.send(new Discord.Attachment(screenshot, "screenshot.png"));
		page.close();
	}

})();