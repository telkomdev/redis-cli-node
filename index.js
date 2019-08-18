'use strict';

const net = require('net');
const readline = require('readline');
const giveColor = require('./colors');

const rl = readline.createInterface(process.stdin, process.stdout);

const prompt = (client, question, handler) => {
    rl.question(question, (answer) => {
        if (handler(answer) !== false) {
            prompt(client, question, handler)
        } else {
            client.destroy();
            rl.close();
        }
    });
};

function Redis(options) {
    this.client = new net.Socket();
    // default options
    this.host = '127.0.0.1';
    this.port = 6379;
    this.password = '';

    if (options.host) {
        this.host = options.host;
    }

    if (options.port) {
        this.port = options.port
    }

    if (options.password) {
        this.password = options.password
    }
}

// const receiveCommand = () => {
//     prompt('rednode> ', (input) => {
//         if (input in menus) {
//             menus[input].command();
//         } else {
//             menu();
//         }
//     });
// };

Redis.prototype.start = function() {

    const client = this.client;

    const handleCommand = () => {
        console.log('connected..');
        if (this.password != '') {
            client.write(`AUTH ${this.password}\r\n`);
        }

        prompt(client, 'rednode> ', (input) => {
            if (input.trim() !== 'exit'){
                client.write(`${input}\r\n`);
                return true;
            } else {
                return false;
            }
        });
    };

    client.connect({host: this.host, port: this.port}, handleCommand);
    
    client.setEncoding('utf8');

    client.on('data', (data) => {
        console.log(giveColor(data, 'cyan'));
        prompt(client, 'rednode> ', (input) => {
            if (input.trim() !== 'exit'){
                client.write(`${input}\r\n`);
                return true;
            } else {
                return false;
            }
        });
    });

    client.on('end', () => {
        console.log(giveColor('connection disconnect', 'red'));
    });

    client.on('timeout', () => {
        console.log(giveColor('connection timeout', 'red'));
        process.exit(1);
    });

    client.on('error', (err) => {
        console.log(giveColor(`connection error ${err.message}`, 'red'));
        process.exit(1);
    });
};

module.exports = {
    Redis, giveColor
};