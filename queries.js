import pgPromise from 'pg-promise';

const pgp = pgPromise({});
const db = pgp(process.env.DB_URL);

async function getAllPeople(req, res, next) {
    try {
        const people = await db.any(`SELECT * FROM people`);

        const data = await populateFriends(people);

        res.status(200).json({
            status: 'OK',
            data,
            message: 'Retrieved ALL people'
        });
    } catch(err) {
        return next(err);
    }
}

async function getPeople(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const people = await db.one(`SELECT * FROM people WHERE id=$1`, id);
        const data = await populateFriends(people);
        res.status(200).json({
            status: 'OK',
            data,
            message: 'Retrieved ONE People'
        });
    } catch(err) {
        return next(err);
    }
}

async function createPeople(req, res, next) {
    req.body.age = parseInt(req.body.age);
    try {
        await db.none("INSERT INTO people(name, email, location) VALUES (${name}, ${email}, ${location})", req.body);
        res.status(200).json({
            status: 'OK',
            message: 'Inserted one people'
        });
    } catch(err) {
        return next(err);
    }
}

async function updatePeople(req, res, next) {
    try {
        const { name, email, location } = req.body;
        await db.none('UPDATE people SET name=$1, email=$2, location=$3 WHERE id=$4', [name, email, location, parseInt(req.params.id)]);
        res.status(200).json({
            status: 'OK',
            message: 'Updated people'
        });
    } catch(err) {
        return next(err);
    }
}

async function removePeople(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const result = await db.result('DELETE FROM people WHERE id=$1', id);
        res.status(200).json({
            status: 'OK',
            message: `Removed ${result.rowCount} people`
        });
    } catch(err) {
        return next(err);
    }
}

async function populateFriends(data) {
    if(data.length > 0) {
        for(let i=0; i<data.length; i++) {
            data[i].friends = [];
            const friends = await db.any('SELECT friend_id FROM friends WHERE people_id=$1', data[i].id);
            for(let j=0; j<friends.length; j++) {
                data[i].friends.push(friends[j].friend_id);
            }
        }
        return data;
    } else {
        data.friends = [];
        const friends = await db.any('SELECT friend_id FROM friends WHERE people_id=$1', data.id);
        for(let j=0; j<friends.length; j++) {
            data.friends.push(friends[j].friend_id);
        }
        return data;
    }
}

export {
    getAllPeople,
    getPeople,
    createPeople,
    updatePeople,
    removePeople,
    db
}
