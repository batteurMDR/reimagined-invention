"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.MovementType = exports.PyroCategory = void 0;
const lowdb_node_1 = require("lowdb-node");
const moment = require("moment");
const uuid = require("uuid");
var PyroCategory;
(function (PyroCategory) {
    PyroCategory[PyroCategory["1.4G/S"] = 0] = "1.4G/S";
    PyroCategory[PyroCategory["1.3G"] = 1] = "1.3G";
})(PyroCategory = exports.PyroCategory || (exports.PyroCategory = {}));
var MovementType;
(function (MovementType) {
    MovementType[MovementType["Entr\u00E9e"] = 0] = "Entr\u00E9e";
    MovementType[MovementType["Sortie"] = 1] = "Sortie";
})(MovementType = exports.MovementType || (exports.MovementType = {}));
class Database {
    static instance;
    _db;
    constructor() {
        const file = './database.json';
        const adapter = new lowdb_node_1.JSONFile(file);
        this._db = new lowdb_node_1.Low(adapter);
        this._initialize();
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    getMovementTypes() {
        const values = [];
        for (var value of Object.values(MovementType)) {
            if (typeof value === 'string') {
                values.push(value);
            }
        }
        return values;
    }
    getCategories() {
        const values = [];
        for (var value of Object.values(PyroCategory)) {
            if (typeof value === 'string') {
                values.push(value);
            }
        }
        return values;
    }
    addMovement(movement) {
        const newMovement = {
            id: uuid.v4(),
            date: moment().toISOString(),
            ...movement,
        };
        this._db.data.movments.push(newMovement);
        this.save();
    }
    getMovments() {
        return JSON.parse(JSON.stringify(this._db.data.movments)).map((movment) => {
            if (movment.from) {
                const cell = this._db.data.cells.find((cell) => cell.id === movment.from);
                if (cell) {
                    movment.from = cell.name;
                }
            }
            else {
                movment.from = 'Extérieur';
            }
            if (movment.to) {
                const cell = this._db.data.cells.find((cell) => cell.id === movment.to);
                if (cell) {
                    movment.to = cell.name;
                }
            }
            else {
                movment.to = 'Extérieur';
            }
            return movment;
        });
    }
    getRawMovments() {
        return this._db.data.movments;
    }
    addCell(cell) {
        const newCell = {
            id: uuid.v4(),
            ...cell,
        };
        this._db.data.cells.push(newCell);
        this.save();
    }
    updateCell(id, cell) {
        const cellRef = this._db.data.cells.find((cell) => cell.id === id);
        if (cellRef) {
            cellRef.name = cell.name;
            cellRef.category = cell.category;
            cellRef.max = cell.max;
        }
        this.save();
    }
    getCell(id) {
        return this._db.data.cells.find((cell) => cell.id === id);
    }
    getCells() {
        return this._db.data.cells;
    }
    async save() {
        await this._db.write();
    }
    async _initialize() {
        await this._db.read();
        if (!this._db.data) {
            this._db.data = {
                cells: [],
                movments: [],
            };
            this._db.write();
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map