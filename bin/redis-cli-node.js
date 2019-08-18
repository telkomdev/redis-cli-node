#!/usr/bin/env node

const index = require('../index');

const VERSION = '1.0.0';

const [ bin, sourcePath, ...args ] = process.argv;

const main = () => {
	const help = `
		Redis CLI Node
		
		Usage:
		$ redis-cli-node -h localhost -p 6379

		Flag:
		--help | show help
		--version | show version
	`;

	var options = {};
	
	if (args.length <= 0) {
		console.log(index.giveColor(help, 'cyan'));
		process.exit(0);
	}

	else if (args[0] === '--help') {
		console.log(index.giveColor(help, 'cyan'));
		process.exit(0);
	}

	else if (args[0] === '--version') {
		console.log(index.giveColor(`redis-cli-node version ${VERSION}`, 'red'));
		process.exit(0);
	}

	else if (args[0] === '-h' && args[2] === '-p') {
		options.host = args[1];
		if (isNaN(args[3])) {
			console.log(index.giveColor(`invalid port number ${args[3]}`, 'red'));
			process.exit(0);
		}

		options.port = parseInt(args[3]);

		if (args.length > 5) {
			if (args[4] === '-a') {
				options.password = args[5];
			}
		} 
	}
	
	else {
		console.log(index.giveColor(help, 'cyan'));
		process.exit(0);
	}

	const redis = new index.Redis(options);
	redis.start();
		
};

main();
