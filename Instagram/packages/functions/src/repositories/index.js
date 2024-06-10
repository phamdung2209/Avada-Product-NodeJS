export const createOne = async (ref, data) => {
    try {
        const res = await ref.add(data)
        if (!res) {
            throw new Error('Not created')
        }

        return { success: true, message: 'Created successfully' }
    } catch (error) {
        console.log('Error in createOne: ', error.message)
        return { error: error.message, success: false }
    }
}

export const deleteAll = async (ref) => {
    try {
        const res = await ref.delete()
        if (!res) {
            throw new Error('Not deleted')
        }

        return { success: true, message: 'Deleted successfully' }
    } catch (error) {
        console.log('Error in deleteAll: ', error.message)
        return { error: error.message, success: false }
    }
}
