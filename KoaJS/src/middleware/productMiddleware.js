import yup from 'yup'

export const protectedProduct = async (ctx, next) => {
    try {
        const postData = ctx.request.body
        await yup
            .object()
            .shape({
                id: yup.number().positive().integer().required(),
                name: yup.string().required(),
                price: yup.string().required(),
                description: yup.string(),
                product: yup.string().required(),
                color: yup.tuple([yup.string(), yup.string()]),
                image: yup.string().url(),
                createdAt: yup.date().default(() => new Date()),
            })
            .validate(postData, {
                strict: true,
            })
    } catch (error) {
        ctx.body = {
            error: error.message,
        }
    }
}
