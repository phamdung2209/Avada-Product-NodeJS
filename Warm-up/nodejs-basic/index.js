import * as fs from 'fs'

// Lession 1: Warm-up
/**
 * 1. Use this Fake JSON API: https://jsonplaceholder.typicode.com/
 * 2. Get data from all users from API above. You will get a list of 10 users.
 * 3. Get all the posts and comments from the API. Map the data with the users array.
 * 4. Filter only users with more than 3 comments.
 * 5. Reformat the data with the count of comments and posts.
 * 6. Who is the user with the most comments/posts?
 * 7. Sort the list of users by the postsCount value descending?
 * 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
 */

// 2. Get data from all users from API above. You will get a list of 10 users.
const getUsers = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await users.json()
    return data
}

getUsers().then((res) => fs.writeFileSync('./users.json', JSON.stringify(res)))

// 3. Get all the posts and comments from the API. Map the data with the users array.
const getPosts = async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await posts.json()
    return data
}

getPosts().then((res) => fs.writeFileSync('./posts.json', JSON.stringify(res)))

const getComments = async () => {
    const comments = await fetch('https://jsonplaceholder.typicode.com/comments')
    const data = await comments.json()
    return data
}

const mapData = async () => {
    //     const data = await Promise.all([getUsers(), getPosts(), getComments()])
    //     const users = data[0]
    //     const posts = data[1]
    //     const comments = data[2]

    //     const result = users.map((user) => {
    //         const userPosts = posts.filter((post) => post.userId === user.id)
    //         userPosts.forEach((post) => delete post.userId)

    //         const userComments = comments.filter((comment) => comment.postId === user.id)
    //         userComments.forEach((comment) => delete comment.postId)

    //         return {
    //             ...user,
    //             posts: userPosts,
    //             comments: userComments,
    //         }
    //     })

    //     return result

    /** ------- Optimized version ------- */

    const [users, posts, comments] = await Promise.all([getUsers(), getPosts(), getComments()])

    const postsMap = new Map()
    const commentsMap = new Map()

    posts.forEach((post) => {
        if (!postsMap.has(post.userId)) {
            postsMap.set(post.userId, [])
        }
        postsMap.get(post.userId).push(post)
    })

    comments.forEach((comment) => {
        if (!commentsMap.has(comment.postId)) {
            commentsMap.set(comment.postId, [])
        }
        commentsMap.get(comment.postId).push(comment)
    })

    const result = users.map((user) => {
        const userPosts = postsMap.get(user.id) ?? []
        const userComments = userPosts.flatMap((post) => commentsMap.get(post.id) ?? [])

        return {
            ...user,
            posts: userPosts,
            comments: userComments,
        }
    })

    return result
}

mapData().then((res) => fs.writeFileSync('./mappedData.json', JSON.stringify(res)))

// 4. Filter only users with more than 3 comments.
const filterUsers = async () => {
    const data = await mapData()
    const result = data.filter((user) => user.comments.length > 3)
    return result
}

filterUsers().then((res) => fs.writeFileSync('./filteredUsers.json', JSON.stringify(res)))

// 5. Reformat the data with the count of comments and posts.
const reformatData = async () => {
    const data = await mapData()

    const result = data.map((user) => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            commentsCount: user.comments.length,
            postsCount: user.posts.length,
        }
    })

    return result
}

reformatData().then((res) => fs.writeFileSync('./reformattedData.json', JSON.stringify(res)))

// 6. Who is the user with the most comments/posts?
const findUserWithMostComments = async () => {
    const data = await mapData()
    const result = data.reduce((acc, cur) => {
        if (cur.comments.length > acc.comments.length) {
            return cur
        }
        return acc
    })

    return result
}

findUserWithMostComments().then((res) => fs.writeFileSync('./userWithMostComments.json', JSON.stringify(res)))

// 7. Sort the list of users by the postsCount value descending?
const sortUsers = async () => {
    const data = await reformatData()
    const result = data.sort((a, b) => b.postsCount - a.postsCount)
    return result
}

sortUsers().then((res) => fs.writeFileSync('./sortedUsers.json', JSON.stringify(res)))

// 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
const getPostWithComments = async () => {
    const post = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const postData = await post.json()

    const comments = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    const commentsData = await comments.json()

    postData.comments = commentsData
    return postData
}

getPostWithComments().then((res) => fs.writeFileSync('./postWithComments.json', JSON.stringify(res)))
