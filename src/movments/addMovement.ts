import * as inquirer from "inquirer";
import { Cell, Database, Movement } from "../database";

export default function addMovement() {
    return new Promise<void>((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Quel type de mouvement ?',
                choices: [...Database.getInstance().getMovementTypes()],
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
                choices: [...Database.getInstance().getCategories()],
            },
            {
                type: 'list',
                name: 'from',
                message: 'D\'ou viennent les produits ?',
                choices: [...Database.getInstance().getCells().map((cell: Cell) => ({
                    name: cell.name,
                    value: cell.id
                }))],
                when: (answer) => {
                    return answer['type'] !== 'Entrée'
                }
            },
            {
                type: 'list',
                name: 'to',
                message: 'Ou vont les produits?',
                choices: [...Database.getInstance().getCells().map((cell: Cell) => ({
                    name: cell.name,
                    value: cell.id
                }))],
                when: (answer) => {
                    return answer['type'] !== 'Sortie'
                }
            }
        ]).then((answer) => {
            const newMovement: Omit<Omit<Movement, 'id'>, 'date'> = {
                category: answer['category'],
                type: answer['type'],
                quantity: answer['quantity'],
                from: null,
                to: null,
            };

            if (answer['type'] === 'Entrée') {
                newMovement.to = answer['to'];
            } else if (answer['type'] === 'Sortie') {
                newMovement.from = answer['from'];
            }

            Database.getInstance().addMovement(newMovement);

            resolve();
        })
    });
}