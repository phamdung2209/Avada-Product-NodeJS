export const isIgMediaUrlValidTill = async (mediaUrl) => {
    const url = new URL(mediaUrl)
    const urlExpiryTimestamp = parseInt(url.searchParams.get('oe') ?? '0', 16)

    const tillTimestamp = Math.floor(Date.now() / 1000)

    return tillTimestamp <= urlExpiryTimestamp
}
