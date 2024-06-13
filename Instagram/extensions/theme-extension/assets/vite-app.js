;(async () => {
    const BASE_URL = 'https://ig.local.com/vite-app'

    const scriptElement = document.createElement('script')
    scriptElement.type = 'text/javascript'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.src = `${BASE_URL}/vite.js?v=${new Date().getTime()}`
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(scriptElement, firstScript)
})()
