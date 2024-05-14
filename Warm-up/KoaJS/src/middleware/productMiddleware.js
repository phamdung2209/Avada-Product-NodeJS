import yup from 'yup'

export const protectedProduct = async (ctx, next) => {
    try {
        const postData = ctx.request.body
        await yup
            .object()
            .shape({
                // id: yup.number().positive().integer().required(),
                name: yup.string().required(),
                price: yup.string().required(),
                description: yup.string(),
                product: yup.string().required(),
                color: yup.tuple([yup.number(), yup.number(), yup.number(), yup.number()]),
                image: yup.string().url(),
                createdAt: yup.date().default(() => new Date()),
            })
            .validate(postData, {
                strict: true,
            })

        next()
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}
