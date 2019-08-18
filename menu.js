'use strict';

const readline = require('readline');
const giveColor = require('./colors');

const rl = readline.createInterface(process.stdin, process.stdout);

// const prompt = (question, handler) => {
//     rl.question(question, (answer) => {
//         if (handler(answer) !== false) {
//             prompt(question, handler);
//         } else {
//             rl.close();
//         }
//     });
// };

const prompt = (question, handler) => {
    rl.question(question, (answer) => {
        handler(answer);
    });
};

const menuOne = () => {
    console.log('menu one');
    prompt('input data> ', (input) => {
        console.log(input);
        menu();
    });
};

const menuTwo = () => {
    console.log('menu two');
    prompt('input data> ', (input) => {
        console.log(input);
        menu();
    });
};

const menuExit = () => {
    rl.close();
    console.log(giveColor('bye..', 'red'));
}

const menus = {
    '1': {
        'menuName': 'menu one',
        'command': menuOne
    },
    '2': {
        'menuName': 'menu two',
        'command': menuTwo
    },
    '3': {
        'menuName': 'exit',
        'command': menuExit
    }
};

const menu = () => {
    Object.keys(menus).forEach((key) => {
        console.log(giveColor(`[${key}] ${menus[key].menuName}`, 'red'));
    });
    prompt('cool> ', (input) => {
        if (input in menus) {
            menus[input].command();
        } else {
            menu();
        }
    });
};

const menuAction = () => {
    menu();
};

module.exports = menuAction;