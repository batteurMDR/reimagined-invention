"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
function listCells() {
    for (let i = 0; i < 5; i++) {
        console.log('');
    }
    const cells = database_1.Database.getInstance().getCells();
    console.table(cells.map((cell) => ({
        'Nom': cell.name,
        'Catégorie acceptée': cell.category,
        'Quantitée maximum (kg)': cell.max,
    })));
    for (let i = 0; i < 5; i++) {
        console.log('');
    }
}
exports.default = listCells;
//# sourceMappingURL=listCells.js.map