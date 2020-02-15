const app = require('express')()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

app.listen(4000, () => {
  console.log(`port listening in the port...`)
})