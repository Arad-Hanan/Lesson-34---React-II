import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'bookDB'
const CATEGORIES = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getCategories,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let booksToShow = books

            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                booksToShow = booksToShow.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                booksToShow = booksToShow.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            if (filterBy.maxPrice) {
                booksToShow = booksToShow.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            if (filterBy.category) {
                booksToShow = booksToShow.filter(book => book.categories.includes(filterBy.category))
            }
            if (filterBy.isOnSale) {
                booksToShow = booksToShow.filter(book => book.listPrice.isOnSale)
            }

            return booksToShow
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOK_KEY, book)
    else return storageService.post(BOOK_KEY, book)
}

function getEmptyBook(title = '', amount = 0) {
    return {
        title,
        subtitle: '',
        authors: [],
        publishedDate: new Date().getFullYear(),
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: 'assets/img/default.png',
        language: 'en',
        listPrice: {
            amount,
            currencyCode: 'EUR',
            isOnSale: false,
        },
    }
}

function getDefaultFilter() {
    return { title: '', minPrice: '', maxPrice: '', category: '', isOnSale: false }
}

function getCategories() {
    return [...CATEGORIES]
}

// Private functions

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (books && books.length) return

    books = []
    for (let i = 0; i < 20; i++) {
        books.push({
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [CATEGORIES[utilService.getRandomIntInclusive(0, CATEGORIES.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: 'en',
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.7,
            },
        })
    }

    utilService.saveToStorage(BOOK_KEY, books)
}
