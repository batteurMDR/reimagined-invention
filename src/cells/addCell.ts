import * as inquirer from "inquirer";
import { Database } from "../database";

export default function addCell() {
    return new Promise<void>((resolve, reject) => {
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
                choices: [...Database.getInstance().getCategories()],
            },
            {
                type: 'number',
                name: 'max',
                message: 'Quelle est la quantitée maximum de M.A. équivalente accepter dans la cellule (kg) ?',
            }
        ]).then((answer) => {
            Database.getInstance().addCell({
                name: answer['name'],
                category: answer['category'],
                max: answer['max']
            })
            resolve();
        })
    });
}