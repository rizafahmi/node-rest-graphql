import pgPromise from 'pg-promise';

const pgp = pgPromise({});
const db = pgp(process.env.DB_URL);

export {
    getAllPeople,
    getPeople,
    createPeople,
    updatePeople,
    removePeople
}
