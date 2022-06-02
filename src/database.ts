import { Low, JSONFile } from 'lowdb-node';
import * as moment from 'moment';
import * as uuid from 'uuid';

export enum PyroCategory {
    '1.4G/S',
    '1.3G'
}

export interface Cell {
    id: string;
    name: string;
    category: PyroCategory;
    max: number;
}

export enum MovementType {
    'Entrée',
    'Sortie'
}

export interface Movement {
    id: string;
    date: string;
    category: PyroCategory;
    type: MovementType;
    quantity: number;
    from: string | null;
    to: string | null;
}

export interface LocalDatabase {
    cells: Cell[];
    movments: Movement[];
}

export class Database {
    private static instance: Database;
    private _db: Low<LocalDatabase>;

    constructor() {
        const file = './database.json';
        const adapter = new JSONFile<LocalDatabase>(file);
        this._db = new Low<LocalDatabase>(adapter);
        this._initialize();
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public getMovementTypes() {
        const values = [];
        for (var value of Object.values(MovementType)) {
            if (typeof value === 'string') {
                values.push(value);
            }
        }
        return values;
    }

    public getCategories() {
        const values = [];
        for (var value of Object.values(PyroCategory)) {
            if (typeof value === 'string') {
                values.push(value);
            }
        }
        return values;
    }

    public addMovement(movement: Omit<Omit<Movement, 'id'>, 'date'>) {
        const newMovement: Movement = {
            id: uuid.v4(),
            date: moment().toISOString(),
            ...movement,
        }
        this._db.data.movments.push(newMovement);
        this.save();
    }

    public getMovments() {
        return JSON.parse(JSON.stringify(this._db.data.movments)).map((movment: Movement) => {
            if (movment.from) {
                const cell: Cell = this._db.data.cells.find((cell: Cell) => cell.id === movment.from);
                if (cell) {
                    movment.from = cell.name
                }
            } else {
                movment.from = 'Extérieur';
            }
            if (movment.to) {
                const cell: Cell = this._db.data.cells.find((cell: Cell) => cell.id === movment.to);
                if (cell) {
                    movment.to = cell.name
                }
            } else {
                movment.to = 'Extérieur';
            }
            return movment;
        });
    }
    
    public getRawMovments() {
        return this._db.data.movments;
    }

    public addCell(cell: Omit<Cell, 'id'>) {
        const newCell: Cell = {
            id: uuid.v4(),
            ...cell,
        }
        this._db.data.cells.push(newCell);
        this.save();
    }

    public updateCell(id: string, cell: Omit<Cell, 'id'>) {
        const cellRef: Cell = this._db.data.cells.find((cell: Cell) => cell.id === id);
        if (cellRef) {
            cellRef.name = cell.name;
            cellRef.category = cell.category;
            cellRef.max = cell.max;
        }
        this.save();
    }

    public getCell(id: string): Cell {
        return this._db.data.cells.find((cell: Cell) => cell.id === id);
    }

    public getCells(): Cell[] {
        return this._db.data.cells;
    }

    public async save() {
        await this._db.write();
    }

    private async _initialize() {
        await this._db.read();
        if (!this._db.data) {
            this._db.data = {
                cells: [],
                movments: [],
            }
            this._db.write();
        }
    }

}