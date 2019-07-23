const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();

app.use(bodyParser.json());

/*app.get('/', (req, res, next) => {
    res.send("Hello World!");
})*/

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events(booked: Boolean): [String!]!

        }

        type RootMutation{
            createEvent{name: String}: String

        }

        schema {
            query: RootQuery
            mutation: RootMutation

        }
    `),
    rootValue: {
        events: () => {
            return ['Romantic Cooking', 'Sailing', 'All-night Coding'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphql: true

}));

app.listen(3000);