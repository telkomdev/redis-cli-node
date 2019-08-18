'use strict';

const net = require('net');
const readline = require('readline');
const giveColor = require('./colors');

const rl = readline.createInterface(process.stdin, process.stdout);

const prompt = (question, handler) => {
    rl.question(question, (answer) => {
        handler(answer);
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
    };

    client.connect({host: this.host, port: this.port}, handleCommand);
    
    client.setEncoding('utf8');

    client.on('data', (data) => {
        console.log(giveColor(`rednode> ${data}`, 'cyan'));
    });

    client.on('end', () => {
        console.log('Client socket disconnect. ');
    });

    client.on('timeout', () => {
        console.log('Client connection timeout. ');
        client.end('bye');
    });

    client.on('error', (err) => {
        console.log(giveColor(`connection error ${err.message}`, 'red'));
    });
};

module.exports = {
    Redis, giveColor
};