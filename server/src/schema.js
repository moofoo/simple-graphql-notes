const { gql } = require('apollo-server');

const typeDefs = gql`
  type Note {
    id: Int
    text: String
    title: String
    date: String
  }

  type Query {
    notes: [Note]
    note(id: Int!): Note
  }

  type Mutation {
    addNote(text: String!, title: String!): Note
    updateNote(id: Int!, title: String!, text: String!): Note
    removeNote(id: Int!): Note
  }
`;

module.exports = typeDefs;
