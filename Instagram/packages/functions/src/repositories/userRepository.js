const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore()
const usersRef = firestore.collection('users')

export const createOne = async (data) => {
    try {
        const user = await usersRef.add(data)
        if (!user) {
            throw new Error('User not created')
        }

        return { data: user, success: true }
    } catch (error) {
        console.error('Error in createOne: ', error.message)
        return { error: error.message, success: false }
    }
}

export const getUsers = async () => {
    try {
        const users = await usersRef.get()
        if (users.empty) {
            throw new Error('No users found')
        }

        return users.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
    } catch (error) {
        console.error('Error in getUsers: ', error.message)
        return []
    }
}

export const getUserById = async ({ user_id }) => {
    try {
        const user = await usersRef.doc('' + user_id).get()
        if (user.empty) {
            throw new Error('No user found')
        }

        return {
            ...user.data(),
            id: user.id,
        }
    } catch (error) {
        console.log('Error in getUserById: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

// logout all users
export const deleteAllUsers = async () => {
    try {
        const batch = firestore.batch()

        const { docs } = await usersRef.get()
        docs.forEach((doc) => batch.delete(doc.ref))
        await batch.commit()

        return {
            success: true,
            message: 'Users deleted',
        }
    } catch (error) {
        console.log('Error in deleteAllUsers: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}
