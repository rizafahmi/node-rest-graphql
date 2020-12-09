import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { db } from './queries.js';

const PeopleType = new GraphQLObjectType({
    name: "People",
    fields: function() {
        return {
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            location: {
                type: GraphQLString
            },
            friends: {
                type: new GraphQLList(PeopleType),
                async resolve(people) {
                    let friends = [];
                    const result = await db.any("SELECT friend_id FROM friends WHERE people_id=$1", people.id);
                    for(let i=0; i<result.length; i++) {
                        const friend = await db.one("SELECT * FROM people WHERE id=$1", result[i].friend_id);
                        friends.push(friend);
                    }
                    return friends;
                }
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            allPeople: {
                type: new GraphQLList(PeopleType),
                resolve: async function () {
                    const people = await db.any(`SELECT * FROM people`);
                    return people;
                }
            },
            people: {
                type: PeopleType,
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve: async function(obj, { id }, context) {
                    const people = await db.one("SELECT * FROM people WHERE id=$1", id);
                    return people;
                }
            }
        },
    }),
    mutation: new GraphQLObjectType({
        name: "PeopleMutation",
        fields: {
            addPeople: {
                type: PeopleType,
                args: {
                    name: { type: GraphQLString },
                    email: { type: GraphQLString },
                    location: { type: GraphQLString }
                },
                async resolve(root, { name, email, location }) {
                    // insert data
                    try {
                        const result = await db.none(`INSERT INTO people (name, email, location) VALUES (${name}, ${email}, ${location})`);
                        console.log(result);
                        return {name, email, location}
                    } catch(err) {
                        return err;
                    }
                }
            }
        }
    })
});

export default schema;
