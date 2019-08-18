#!/usr/bin/env node

const index = require('../index');

const VERSION = '1.0.0';

const [ bin, sourcePath, ...args ] = process.argv;

const main = () => {
	const help = `
		Redis CLI Node
		
		Usage:
		run | run redis-cli-node
		-h -help | show help
		-version | show version
	`;
	
	if (args.length <= 0) {
		console.log(help);
		process.exit(0);
	}

	if (args[0] === '-h' || args[0] === '-help') {
		console.log(help);
		process.exit(0);
	}

	if (args[0] === '-version') {
		console.log(index.giveColor(`redis-cli-node version ${VERSION}`, 'red'));
		process.exit(0);
	}

	if (args[0] === 'run') {
		const redis = new index.Redis({argOne: args[0]});
		redis.exec();
	}
		
};

main();
