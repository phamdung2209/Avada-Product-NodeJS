import books from './books.json' assert { type: 'json' }
import * as fs from 'fs'

export const getAll = () => {
    return books.data
}

export const getOne = (id) => {
    return books.data.find((book) => book.id === parseInt(id))
}

export const add = (book) => {
    books.data.push(book)
    return fs.writeFileSync(
        './src/database/books.json',
        JSON.stringify({
            data: books.data,
        }),
    )
}
