import * as inquirer from "inquirer";
import { Cell, Database } from "../database";

export default function editCell() {
    return new Promise<void>((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Quelle cellule voulez-vous modifier ?',
                choices: [...Database.getInstance().getCells().map((cell: Cell) => ({
                    name: cell.name,
                    value: cell.id
                }))],
            }
        ]).then((firstAnswer) => {
            const cell = Database.getInstance().getCell(firstAnswer['id']);
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
                    choices: [...Database.getInstance().getCategories()],
                    default: cell.category
                },
                {
                    type: 'number',
                    name: 'max',
                    message: 'Quelle est la quantitée maximum de M.A. accepter dans la cellule (kg) ?',
                    default: cell.max
                }
            ]).then((answer) => {
                console.log(answer)
                Database.getInstance().updateCell(firstAnswer['id'], {
                    name: answer['name'],
                    category: answer['category'],
                    max: answer['max']
                })
                resolve();
            });
        })
    });
}