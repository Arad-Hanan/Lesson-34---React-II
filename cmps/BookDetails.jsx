const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { LongTxt } from './LongTxt.jsx'

export function BookDetails({ bookId, onGoBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('Had issues loading book:', err))
    }

    if (!book) return <div className="loader">Loading details...</div>

    const { title, subtitle, authors, publishedDate, description,
        pageCount, categories, thumbnail, language, listPrice } = book

    return <section className="book-details">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>

        <img src={thumbnail} alt={title} />

        {listPrice.isOnSale && <div className="sale-sign">On Sale!</div>}

        <p className={`price ${getPriceClass(listPrice.amount)}`}>
            Price: {listPrice.amount} {listPrice.currencyCode}
        </p>

        <p>By: {authors.join(', ')}</p>
        <p>Published: {publishedDate} <span className="badge">{getPublishTxt(publishedDate)}</span></p>
        <p>{pageCount} pages <span className="badge">{getReadingTxt(pageCount)}</span></p>
        <p>Categories: {categories.join(', ')}</p>
        <p>Language: {language}</p>

        <LongTxt txt={description} />

        <button onClick={onGoBack}>Back to list</button>
    </section>
}

function getReadingTxt(pageCount) {
    if (pageCount > 500) return 'Serious Reading'
    if (pageCount > 200) return 'Descent Reading'
    if (pageCount < 100) return 'Light Reading'
    return ''
}

function getPublishTxt(publishedDate) {
    const diff = new Date().getFullYear() - publishedDate
    if (diff > 10) return 'Vintage'
    if (diff < 1) return 'New'
    return ''
}

function getPriceClass(amount) {
    if (amount > 150) return 'expensive'
    if (amount < 20) return 'cheap'
    return ''
}
