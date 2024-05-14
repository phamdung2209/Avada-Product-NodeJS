import { faker, simpleFaker } from '@faker-js/faker'
import products from './products.json' assert { type: 'json' }

export const getAll = () => {
    return products
}
