import { add, getAll as getAllBooks, getOne as getOneBook } from '../../database/bookRepository.js'

export const getBooks = async (ctx) => {
    try {
        const books = getAllBooks()

        if (!books) {
            throw new Error('Books not found')
        }

        ctx.body = {
            data: books,
        }
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

export const getBook = async (ctx) => {
    try {
        const { id } = ctx.params
        const book = getOneBook(id)

        if (!book) {
            throw new Error('Book not found')
        }

        ctx.body = {
            data: book,
        }
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

export const save = async (ctx) => {
    try {
        const book = ctx.request.body
        add(book)

        ctx.body = {
            data: book,
        }
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}
