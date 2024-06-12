import { Firestore } from '@google-cloud/firestore'
import { deleteAllUsers } from './userRepository'

const firestore = new Firestore()
const usersRef = firestore.collection('users')

export const userCallback = async ({
    user_id,
    accessTokenHash,
    permissions,
    username,
    expires_in,
}) => {
    try {
        // Delete users / logout
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
