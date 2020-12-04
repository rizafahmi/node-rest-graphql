import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema,GraphQLObjectType, GraphQLString } from 'graphql';

import router from './router.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        }
    })
})

app.get('/', function(req, res) {
    res.json({status: "OK"})
});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.use(router);

app.listen(3000, function() {
    console.info(`Server running at http://localhost:3000/`)
})
