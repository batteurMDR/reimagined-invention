"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const database_1 = require("./database");
function addMovement() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Quel type de mouvement ?',
                choices: [...database_1.Database.getInstance().getMovementTypes()],
            },
            {
                type: 'number',
                name: 'quantity',
                message: 'Quelle est la quantitée de M.A. (kg) ?',
            },
            {
                type: 'list',
                name: 'category',
                message: 'Quelle est la catégorie des produits ?',
                choices: [...database_1.Database.getInstance().getCategories()],
            },
            {
                type: 'list',
                name: 'from',
                message: 'D\'ou viennent les produits ?',
                choices: [...database_1.Database.getInstance().getCells().map((cell) => ({
                        name: cell.name,
                        value: cell.id
                    }))],
                when: (answer) => {
                    return answer['type'] !== 'Entrée';
                }
            },
            {
                type: 'list',
                name: 'to',
                message: 'Ou vont les produits?',
                choices: [...database_1.Database.getInstance().getCells().map((cell) => ({
                        name: cell.name,
                        value: cell.id
                    }))],
                when: (answer) => {
                    return answer['type'] !== 'Sortie';
                }
            }
        ]).then((answer) => {
            const newMovement = {
                category: answer['category'],
                type: answer['type'],
                quantity: answer['quantity'],
                from: null,
                to: null,
            };
            if (answer['type'] === 'Entrée') {
                newMovement.to = answer['to'];
            }
            else if (answer['type'] === 'Sortie') {
                newMovement.from = answer['from'];
            }
            else {
                newMovement.to = answer['to'];
                newMovement.from = answer['from'];
            }
            database_1.Database.getInstance().addMovement(newMovement);
            resolve();
        });
    });
}
exports.default = addMovement;
//# sourceMappingURL=addMovement.js.map