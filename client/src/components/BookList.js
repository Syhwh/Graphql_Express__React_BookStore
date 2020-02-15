import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'




function BookList(props) {
  const [selected, setSelected] = useState()

  const data = props.data
  console.log(data)
  if (data.loading) return <h1>Loading</h1>
  return (<>
    <ul>{
      data.books.map(book => {
        return (
          <li key={book.id} onClick={(e) => { setSelected(book.id) }}>{book.name}</li>
        )
      })
    }
    </ul>
    <BookDetails bookId={selected} />
  </>
  )
}
export default graphql(getBooksQuery)(BookList)