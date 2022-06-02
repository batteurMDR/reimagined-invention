"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const database_1 = require("./database");
function editCell() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Quelle cellule voulez-vous modifier ?',
                choices: [...database_1.Database.getInstance().getCells().map((cell) => ({
                        name: cell.name,
                        value: cell.id
                    }))],
            }
        ]).then((firstAnswer) => {
            const cell = database_1.Database.getInstance().getCell(firstAnswer['id']);
            if (!cell) {
                resolve();
                return;
            }
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Comment se nomme la cellule ?',
                    default: cell.name
                },
                {
                    type: 'list',
                    name: 'category',
                    message: 'Quelle est la catégorie maximum accepter dans la cellule ?',
                    choices: [...database_1.Database.getInstance().getCategories()],
                    default: cell.category
                },
                {
                    type: 'number',
                    name: 'max',
                    message: 'Quelle est la quantitée maximum de M.A. accepter dans la cellule (kg) ?',
                    default: cell.max
                }
            ]).then((answer) => {
                console.log(answer);
                database_1.Database.getInstance().updateCell(firstAnswer['id'], {
                    name: answer['name'],
                    category: answer['category'],
                    max: answer['max']
                });
                resolve();
            });
        });
    });
}
exports.default = editCell;
//# sourceMappingURL=editCell.js.map