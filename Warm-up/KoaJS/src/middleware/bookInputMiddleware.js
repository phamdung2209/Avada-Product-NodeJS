import yup from 'yup'
import { faker } from '@faker-js/faker'

const validateBookInput = async (ctx, next) => {
    try {
        const postData = ctx.request.body
        const schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            author: yup.string().required(),
            address: yup.string(),
        })

        await schema.validate(postData, {
            strict: true,
        })

        next()
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}

export default validateBookInput
