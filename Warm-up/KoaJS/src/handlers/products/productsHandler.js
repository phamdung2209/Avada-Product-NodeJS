import { getAll } from '../../database/productRepository.js'
import products from '../../database/products.json' assert { type: 'json' }
import * as fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

export const getProducts = async (ctx) => {
    try {
        const products = getAll()

        if (!products) {
            throw new Error('Products not found')
        }

        //  PAGINATION HERE
        const { page = 1, per_page = 10, sortBy } = ctx.query

        if (page) {
            const offset = (+page - 1) * +per_page
            let newProducts = products

            const host = ctx.request.header.host
            const totalPgae = Math.ceil(newProducts.length / +per_page)
            const protocol = ctx.request.protocol

            const filteredLinks = () => {
                const links = {
                    next:
                        +page < totalPgae
                            ? `${protocol}://${host}/api/products?page=${
                                  +page <= 0 ? 1 : +page + 1
                              }&per_page=${per_page}`
                            : null,
                    previous:
                        +page > 1
                            ? `${protocol}://${host}/api/products?page=${
                                  +page > totalPgae ? totalPgae : +page - 1
                              }&per_page=${per_page}`
                            : null,
                }

                return Object.fromEntries(
                    Object.entries(links).filter(([key, value]) => {
                        return value !== null
                    }),
                )
            }

            const data = newProducts.slice(offset, offset + +per_page)
            const sortedData = (data) => {
                switch (sortBy) {
                    case 'id':
                        return sortProducts(data, 'id')
                    case 'name':
                        return sortProducts(data, 'name')
                    case 'desc':
                        return orderByProduct(data, 'desc')
                    case 'asc':
                        return orderByProduct(data, 'asc')
                    case 'id' && 'name':
                        return orderByProduct(data, 'name')
                    default:
                        return data
                }
            }

            if (offset >= 0) {
                return (ctx.body = {
                    data: sortedData(data),
                    meta: {
                        pagination: {
                            total: newProducts.length,
                            count: data.length,
                            per_page: +per_page,
                            current_page: +page,
                            total_pages: totalPgae,
                            links: filteredLinks(),
                        },
                    },
                })
            }

            if (offset < 0) {
                return (ctx.body = {
                    data: [],
                    meta: {
                        pagination: {
                            total: 0,
                            count: 0,
                            per_page: +per_page,
                            current_page: 0,
                            total_pages: 0,
                            links: filteredLinks(),
                        },
                    },
                })
            }
        }

        ctx.body = {
            data: sortedData(products),
            meta: {
                pagination: {
                    total: products.length,
                },
            },
        }
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

const sortProducts = (products, sortBy) => {
    if (sortBy === 'id') {
        return products.sort((a, b) => a.id - b.id)
    }

    if (sortBy === 'name') {
        return products.sort((a, b) => a.name.localeCompare(b.name))
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
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    try {
        const { name, description, images, product: productType, price } = ctx.request.body
        const uuid = Math.random().toString(36).substr(2, 9)

        const { secure_url } = await cloudinary.uploader.upload(images, {
            folder: 'NodeJS/Products',
        })

        const product = {
            id: uuid,
            createdAt: new Date(),
            image: secure_url,
            name,
            description,
            product: productType,
            price,
        }

        fs.writeFileSync('./src/database/products.json', JSON.stringify([...products, product]))

        return (ctx.body = {
            message: 'Create product success',
        })
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

export const updateProduct = async (ctx) => {
    try {
        const { name, description, images, product: productType, price } = ctx.request.body
        const { id } = ctx.params

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        const { secure_url } = await cloudinary.uploader.upload(images, {
            folder: 'NodeJS/Products',
        })

        const product = products.find((product) => product.id === id)
        if (!product) {
            throw new Error('Product not found')
        }
        // const uuid = Math.random().toString(36).substr(2, 9)
        const newData = {
            createdAt: new Date(),
            id,
            image: secure_url,
            name,
            description,
            product: productType,
            price,
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

export const deleteProduct = async (ctx) => {
    try {
        const { id } = ctx.params
        const product = products.find((product) => product.id === id)
        if (!product) {
            throw new Error('Product not found')
        }

        const index = products.findIndex((product) => product.id === id)
        products.splice(index, 1)
        fs.writeFileSync('./src/database/products.json', JSON.stringify(products))

        return (ctx.body = {
            message: 'Delete product success',
        })
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

// SEARCH PRODUCT BY NAME
export const getProductByName = async (ctx) => {
    try {
        const { q } = ctx.query
        if (q.trim() === '') return

        const product = products.filter((product) => {
            const name = product.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            const search = q
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            return name.includes(search)
        })
        if (!product) {
            throw new Error('Product not found')
        }

        ctx.body = {
            data: product,
            meta: {
                pagination: {
                    total: product.length,
                },
            },
        }
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}
