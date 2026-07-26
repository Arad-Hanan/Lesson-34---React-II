import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSelectBook, onRemoveBook }) {

    return <ul className="book-list">
        {books.map(book => <li key={book.id}>
            <BookPreview book={book} />

            <div className="book-actions">
                <button onClick={() => onSelectBook(book.id)}>Details</button>
                <button onClick={() => onRemoveBook(book.id)}>Delete</button>
            </div>
        </li>)}
    </ul>
}
