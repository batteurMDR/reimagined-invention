#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const database_1 = require("./database");
const addCell_1 = require("./cells/addCell");
const editCell_1 = require("./cells/editCell");
const listCells_1 = require("./cells/listCells");
const addMovement_1 = require("./movments/addMovement");
const listMovments_1 = require("./movments/listMovments");
const moment = require("moment");
moment.locale('fr');
const whattodo = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Que voulez-vous faire?',
            choices: ['Ajouter un mouvement', 'Lister les mouvements', 'Lister les cellules', 'Ajouter une cellule', 'Modifier une cellule', 'Sauvegarder', 'Quitter'],
            filter: (val) => {
                return val.toLowerCase();
            }
        }
    ]).then(async (answer) => {
        switch (answer.action) {
            case 'ajouter un mouvement':
                await (0, addMovement_1.default)();
                whattodo();
                break;
            case 'lister les mouvements':
                (0, listMovments_1.default)();
                whattodo();
                break;
            case 'lister les cellules':
                (0, listCells_1.default)();
                whattodo();
                break;
            case 'ajouter une cellule':
                await (0, addCell_1.default)();
                whattodo();
                break;
            case 'modifier une cellule':
                await (0, editCell_1.default)();
                whattodo();
                break;
            case 'sauvegarder':
                await database_1.Database.getInstance().save();
                whattodo();
                break;
            case 'quitter':
                goodbye();
                break;
            default:
                whattodo();
                break;
        }
    });
};
const goodbye = async () => {
    await database_1.Database.getInstance().save();
    figlet('Aurevoir', (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.yellow(data));
    });
};
const start = () => {
    figlet('Pyro - Registre', async (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red(data));
        database_1.Database.getInstance();
        whattodo();
    });
};
console.clear();
start();
//# sourceMappingURL=index.js.map