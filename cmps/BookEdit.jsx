const { useState } = React

import { bookService } from '../services/book.service.js'

export function BookEdit({ onSaveBook, onCancel }) {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (value === '') ? '' : +value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        // listPrice fields are nested, the rest are flat
        if (field === 'amount' || field === 'currencyCode' || field === 'isOnSale') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, [field]: value },
            }))
        } else if (field === 'authors' || field === 'categories') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                [field]: value.split(',').map(str => str.trim()).filter(str => str),
            }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSaveBook(bookToEdit)
    }

    const { title, subtitle, authors, publishedDate, description,
        pageCount, categories, thumbnail, language, listPrice } = bookToEdit

    return <section className="book-edit">
        <h2>Add a New Book</h2>

        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={handleChange} />

            <label htmlFor="subtitle">Subtitle:</label>
            <input type="text" id="subtitle" name="subtitle" value={subtitle} onChange={handleChange} />

            <label htmlFor="authors">Authors (comma separated):</label>
            <input type="text" id="authors" name="authors" value={authors.join(', ')} onChange={handleChange} />

            <label htmlFor="publishedDate">Published year:</label>
            <input type="number" id="publishedDate" name="publishedDate" value={publishedDate} onChange={handleChange} />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={description} onChange={handleChange}></textarea>

            <label htmlFor="pageCount">Page count:</label>
            <input type="number" id="pageCount" name="pageCount" value={pageCount} onChange={handleChange} />

            <label htmlFor="categories">Categories (comma separated):</label>
            <input type="text" id="categories" name="categories" value={categories.join(', ')} onChange={handleChange} />

            <label htmlFor="thumbnail">Thumbnail url:</label>
            <input type="text" id="thumbnail" name="thumbnail" value={thumbnail} onChange={handleChange} />

            <label htmlFor="language">Language:</label>
            <input type="text" id="language" name="language" value={language} onChange={handleChange} />

            <label htmlFor="amount">Price:</label>
            <input type="number" id="amount" name="amount" value={listPrice.amount} onChange={handleChange} />

            <label htmlFor="currencyCode">Currency:</label>
            <select id="currencyCode" name="currencyCode" value={listPrice.currencyCode} onChange={handleChange}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="ILS">ILS</option>
            </select>

            <label htmlFor="isOnSale">On sale:</label>
            <input type="checkbox" id="isOnSale" name="isOnSale" checked={listPrice.isOnSale} onChange={handleChange} />

            <div className="edit-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    </section>
}
