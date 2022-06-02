#!/usr/bin/env node
import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';
import { Database } from './database';
import addCell from './cells/addCell';
import editCell from './cells/editCell';
import listCells from './cells/listCells';
import addMovement from './movments/addMovement';
import listMovments from './movments/listMovments';
import * as moment from 'moment';

moment.locale('fr');

const whattodo = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Que voulez-vous faire?',
            choices: ['Ajouter un mouvement', 'Lister les mouvements', 'Lister les cellules', 'Ajouter une cellule', 'Modifier une cellule', 'Sauvegarder', 'Quitter'],
            filter: (val: string) => {
                return val.toLowerCase();
            }
        }
    ]).then(async (answer) => {
        switch (answer.action) {
            case 'ajouter un mouvement':
                await addMovement();
                whattodo();
                break;
            case 'lister les mouvements':
                listMovments();
                whattodo();
                break;
            case 'lister les cellules':
                listCells();
                whattodo();
                break;
            case 'ajouter une cellule':
                await addCell();
                whattodo();
                break;
            case 'modifier une cellule':
                await editCell();
                whattodo();
                break;
            case 'sauvegarder':
                await Database.getInstance().save();
                whattodo();
                break;
            case 'quitter':
                goodbye();
                break;
            default:
                whattodo();
                break;
        }
    })
}

const goodbye = async () => {
    await Database.getInstance().save();
    figlet('Aurevoir', (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.yellow(data));
    });
}

const start = () => {
    figlet('Pyro - Registre', async (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red(data));
        Database.getInstance();

        whattodo();
    });
}

console.clear();

start();