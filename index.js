'use strict';

const giveColor = require('./colors');
const menuAction = require('./menu');

function Redis(config) {
    //config = {} || config;
    this.config = config;
}

Redis.prototype.exec = function() {
    menuAction();
};

module.exports = {
    Redis, giveColor
};