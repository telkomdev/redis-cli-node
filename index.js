'use strict';

const net = require('net');
const readline = require('readline');
const giveColor = require('./colors');
const menuAction = require('./menu');

const rl = readline.createInterface(process.stdin, process.stdout);

const prompt = (question, handler) => {
    rl.question(question, (answer) => {
        handler(answer);
    });
};

function Redis(options) {
    if (options.host) {
        this.host = options.host;
    } else {
        this.host = '127.0.0.1';
    }

    if (options.port) {
        this.port = options.port
    } else {
        this.port = 6379;
    }

    if (options.password) {
        this.password = options.password
    } else {
        this.password = '';
    }

    console.log(options);
}

Redis.prototype.start = function() {
    const client = new net.Socket();
    client.connect({host: this.host, port: this.port}, () => {
        console.log('connected..');
        if (this.password != '') {
            client.write(`AUTH ${this.password}\r\n`);
        }
    });
    
    client.setEncoding('utf8');

    client.on('data', (data) => {
        console.log(giveColor(`rednode> ${data}`, 'red'));
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