const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookEdit } from '../cmps/BookEdit.jsx'

export function BookIndex() {
    // null = not loaded yet (lets us tell "loading" apart from "no results")
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('Had issues loading books:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('Had issues removing book:', err))
    }

    function onSaveBook(bookToSave) {
        bookService.save(bookToSave)
            .then(() => {
                setIsEdit(false)
                loadBooks()
            })
            .catch(err => console.log('Had issues saving book:', err))
    }

    if (isEdit) return <BookEdit onSaveBook={onSaveBook} onCancel={() => setIsEdit(false)} />

    if (selectedBookId) return <BookDetails
        bookId={selectedBookId}
        onGoBack={() => setSelectedBookId(null)} />

    if (!books) return <div className="loader">Loading books...</div>

    return <section className="book-index">
        <BookFilter filterBy={filterBy} onSetFilter={setFilterBy} />

        <button className="btn-add" onClick={() => setIsEdit(true)}>+ Add Book</button>

        {books.length
            ? <BookList
                books={books}
                onSelectBook={setSelectedBookId}
                onRemoveBook={onRemoveBook} />
            : <p className="no-books">No books match your filter...</p>}
    </section>
}
