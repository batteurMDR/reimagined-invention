"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const moment = require("moment");
function listMovments() {
    for (let i = 0; i < 5; i++) {
        console.log('');
    }
    const movments = database_1.Database.getInstance().getMovments();
    console.table(movments.map((movment) => ({
        'Date': moment(movment.date).format('dddd D MMMM YYYY [à] HH[:]mm'),
        'Catégorie': movment.category,
        'Quantitée (kg)': movment.quantity,
        'Depuis': movment.from,
        'Vers': movment.to,
    })));
    for (let i = 0; i < 5; i++) {
        console.log('');
    }
}
exports.default = listMovments;
//# sourceMappingURL=listMovments.js.map