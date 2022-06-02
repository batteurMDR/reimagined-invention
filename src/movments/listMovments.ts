import { Database, Movement } from "../database";
import * as moment from 'moment';

export default function listMovments() {

    for (let i = 0; i < 5; i++) {
        console.log('');
    }

    const movments: Movement[] = Database.getInstance().getMovments();

    console.table(movments.map((movment) => ({
        'Date': moment(movment.date).format('dddd D MMMM YYYY [à] HH[:]mm'),
        'Catégorie': movment.category,
        'Quantitée (kg)': movment.quantity,
        'Depuis': movment.from,
        'Vers': movment.to,
    })))


    for (let i = 0; i < 5; i++) {
        console.log('');
    }

}