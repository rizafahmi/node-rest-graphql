import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import pgPromise from 'pg-promise';

const pgp = pgPromise({});
const db = pgp(process.env.DB_URL);

const PeopleType = new GraphQLObjectType({
    name: "People",
    fields: {
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
            resolve(people) {
                console.log(people);
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'Hello, GraphQL!';
                }
            }
        },
        fields: {
            allPeople: {
                type: new GraphQLList(PeopleType),
                resolve: async function () {
                    const people = await db.any(`SELECT * FROM people`);
                    console.log(people);
                    return people;
                }
            }
        }
    })
});

export default schema;
