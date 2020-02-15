import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'



function AddBook({ getAuthorsQuery, addBookMutation }) {
  const [bookName, setBookName] = useState()
  const [bookGenre, setBookGenre] = useState()
  const [authorId, setAuthorId] = useState()
  const data = getAuthorsQuery
  const handleOnSubmit = (e) => {
    e.preventDefault()
    addBookMutation({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  if (data.loading) return <p>Loading</p>
  return (
    <form id="add-book" onSubmit={handleOnSubmit}>
      <div className="field">
        <label >Book Name:</label>
        <input type="text" onChange={(e) => setBookName(e.target.value)} />
      </div>
      <div className="field">
        <label >Genre:</label>
        <input type="text" onChange={(e) => setBookGenre(e.target.value)} />
      </div>
      <div className="field">
        <label >Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {data.authors.map(author => {
            return (
              <option key={author.id} value={author.id}>{author.name} </option>
            )
          })}
        </select>
      </div>
      <button type="submit" >+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)