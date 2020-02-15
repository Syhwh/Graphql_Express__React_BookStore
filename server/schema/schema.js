const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema } = graphql;

const _ = require('lodash')

/// Dummie Data

const books = [
  { name: 'book 1', genre: 'genre 1', id: '1', authorId: '1' },
  { name: 'book 2', genre: 'genre 2', id: '2', authorId: '2' },
  { name: 'book 3', genre: 'genre 3', id: '3', authorId: '3' },
  { name: 'book 4', genre: 'genre 1', id: '4', authorId: '1' },
  { name: 'book 5', genre: 'genre 2', id: '5', authorId: '2' },
  { name: 'book 6', genre: 'genre 3', id: '6', authorId: '2' }
]
const authors = [
  { name: 'author 1', age: 25, id: '1' },
  { name: 'author 2', age: 52, id: '2' },
  { name: 'author 3', age: 42, id: '3' }
]

////

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // get data
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})