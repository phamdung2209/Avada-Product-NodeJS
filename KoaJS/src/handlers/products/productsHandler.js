import { getAll } from '../../database/productRepository.js'
import products from '../../database/products.json' assert { type: 'json' }
import * as fs from 'fs'

export const getProducts = async (ctx) => {
    try {
        const products = getAll()
        console.log('products', products.length)
        if (!products) {
            throw new Error('Products not found')
        }

        const { limit, sort } = ctx.query
        let newProducts = products
        if (limit && !sort) {
            return (ctx.body = {
                limit: +limit,
                sort,
                data: newProducts.slice(0, +limit),
            })
        }

        if (sort && !limit) {
            return (ctx.body = {
                limit: +limit,
                sort,
                data: orderByProduct(newProducts, sort),
            })
        }

        if (limit && sort) {
            return (ctx.body = {
                limit: +limit,
                sort,
                data: orderByProduct(newProducts, sort).slice(0, +limit),
            })
        }

        ctx.body = {
            limit: +limit,
            sort,
            data: products,
        }
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

const orderByProduct = (products, sort) => {
    if (sort === 'desc') {
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    if (sort === 'asc') {
        products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    return products
}

export const createProduct = async (ctx) => {
    try {
        const uuid = Math.random().toString(36).substr(2, 9)
        const product = {
            id: uuid,
            createdAt: new Date(),
            ...ctx.request.body,
        }

        products.push(product)

        return (ctx.body = product)
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

export const updateProduct = async (ctx) => {
    try {
        const { id } = ctx.params
        const product = products.find((product) => product.id === id)
        if (!product) {
            throw new Error('Product not found')
        }
        // const uuid = Math.random().toString(36).substr(2, 9)
        const newData = {
            createdAt: new Date(),
            id,
            ...ctx.request.body,
        }

        const index = products.findIndex((product) => product.id === id)
        products[index] = newData
        fs.writeFileSync('./src/database/products.json', JSON.stringify(products))

        return (ctx.body = {
            message: 'Update product success',
        })
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}
