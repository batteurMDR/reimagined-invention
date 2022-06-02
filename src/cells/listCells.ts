import { Cell, Database, Movement } from "../database";
import * as chalk from "chalk";
var Table = require('cli-table');

    // chalkTable({
    //     leftPad: 2,
    //     columns: [
    //       { field: "name", name: chalk.white("Nom") },
    //       { field: "category", name: chalk.white("Catégorie acceptée") },
    //       { field: "quantityAllowed", name: chalk.white("Quantitée maximum autorisée équivalente (kg)") },
    //       { field: "quantityActually", name: chalk.white("Quantitée totale actuelle équivalente (kg)") }
    //     ]
    // }, cellsToDisplay.map((cell) => ({
    //     name: cell.name,
    //     category: cell.category,
    //     quantityAllowed: cell.max,
    //     quantityActually: getColorFromquantityAndMax(cell.total, cell.max)(cell.total),
    // })));


export default function listCells() {

    for (let i = 0; i < 5; i++) {
        console.log('');
    }

    const cellsToDisplay = [];
    const cells: Cell[] = Database.getInstance().getCells();
    const movments: Movement[] = Database.getInstance().getRawMovments();

    for (const cell of cells) {
        let total = 0;
        let input = 0;
        let output = 0;
    
        for (let movment of movments) {
            if (movment.to === cell.id) {
                input += (movment.quantity / getFactorFromCategory(cell.category as any));
            }
            if (movment.from === cell.id) {
                output += (movment.quantity / getFactorFromCategory(cell.category as any));
            }
        }

        total = Math.round((input - output) * 100) / 100;
        cellsToDisplay.push({
            ...cell,
            total
        })
    }

    const table = new Table({
        head: ['Nom', 'Catégorie acceptée', 'Quantitée maximum autorisée équivalente (kg)', 'Quantitée totale actuelle équivalente (kg)'], 
    });

    table.push(...cellsToDisplay.map((cell) => ([
        cell.name,
        cell.category,
        cell.max,
        getColorFromquantityAndMax(cell.total, cell.max)(cell.total),
    ])));

    console.log(table.toString());

    for (let i = 0; i < 5; i++) {
        console.log('');
    }

}

function getFactorFromCategory(category: string) {
    if (category === '1.4G/S') {
        return 5;
    } else if (category === '1.3G') {
        return 3;
    }
}

function getColorFromquantityAndMax(quantity: number, max: number) {
    const percentage = quantity / max;
    if (percentage <= .8) {
        return chalk.green;
    } else if (percentage <= 1) {
        return chalk.yellow;
    } else {
        return chalk.red;
    }
}