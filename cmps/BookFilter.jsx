const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onClearFilter() {
        setFilterByToEdit(bookService.getDefaultFilter())
    }

    const { title, minPrice, maxPrice, category, isOnSale } = filterByToEdit

    return <section className="book-filter">
        <h2>Filter Our Books</h2>

        <form onSubmit={ev => ev.preventDefault()}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="By title"
                value={title} onChange={handleChange} />

            <label htmlFor="minPrice">Min price:</label>
            <input type="number" id="minPrice" name="minPrice" placeholder="From"
                value={minPrice} onChange={handleChange} />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number" id="maxPrice" name="maxPrice" placeholder="Up to"
                value={maxPrice} onChange={handleChange} />

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={category} onChange={handleChange}>
                <option value="">All categories</option>
                {bookService.getCategories().map(ctg =>
                    <option key={ctg} value={ctg}>{ctg}</option>)}
            </select>

            <label htmlFor="isOnSale">On sale only:</label>
            <input type="checkbox" id="isOnSale" name="isOnSale"
                checked={isOnSale} onChange={handleChange} />

            <button type="button" onClick={onClearFilter}>Clear</button>
        </form>
    </section>
}
