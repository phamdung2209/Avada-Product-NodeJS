import { Firestore } from '@google-cloud/firestore'

const firestore = new Firestore()
const usersRef = firestore.collection('users')

export const getMe = async ({ user_id }) => {
    try {
        const user = await usersRef.where('id', '==', user_id).get()
        if (user.empty) {
            throw new Error('No user found')
        }

        return {
            success: true,
            data: user.docs[0].data(),
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export const userCallback = async ({
    user_id,
    accessTokenHash,
    permissions,
    username,
    expires_in,
}) => {
    try {
        // Delete all users
        const deleteUsers = await deleteAllUsers()
        if (!deleteUsers.success) {
            throw new Error(deleteUsers.error)
        }

        // create user use set
        await usersRef.doc('' + user_id).set({
            accessTokenHash,
            permissions,
            username,
            expires_in,
            createdAt: new Date().toISOString(),
        })

        return {
            success: true,
            message: 'User created',
        }
    } catch (error) {
        console.log('Error in userCallback: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const deleteAllUsers = async () => {
    try {
        const batch = firestore.batch()

        const { docs } = await usersRef.get()
        docs.forEach((doc) => batch.delete(doc.ref))
        await batch.commit()

        return {
            success: true,
            message: 'All users deleted',
        }
    } catch (error) {
        console.log('Error in deleteAllUsers: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getUser = async () => {
    try {
        const docUsers = await usersRef.get()
        if (docUsers.empty) {
            throw new Error('No user found')
        }

        return {
            success: true,
            data: {
                ...docUsers.docs[0].data(),
                id: docUsers.docs[0].id,
            },
        }
    } catch (error) {
        console.log('Error in getUser: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}
