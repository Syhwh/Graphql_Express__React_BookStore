import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList'
import AddBook from './components/AddBook';
import './App.css';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        Learn React
    </div>
      <BookList />
      <AddBook />
    </ApolloProvider>
  );
}

export default App;
