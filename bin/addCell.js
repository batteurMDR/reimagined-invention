"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const database_1 = require("./database");
function addCell() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Comment se nomme la cellule ?',
            },
            {
                type: 'list',
                name: 'category',
                message: 'Quelle est la catégorie maximum accepter dans la cellule ?',
                choices: [...database_1.Database.getInstance().getCategories()],
            },
            {
                type: 'number',
                name: 'max',
                message: 'Quelle est la quantitée maximum de M.A. accepter dans la cellule (kg) ?',
            }
        ]).then((answer) => {
            database_1.Database.getInstance().addCell({
                name: answer['name'],
                category: answer['category'],
                max: answer['max']
            });
            resolve();
        });
    });
}
exports.default = addCell;
//# sourceMappingURL=addCell.js.map