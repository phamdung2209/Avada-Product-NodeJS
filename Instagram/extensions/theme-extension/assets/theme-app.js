;(async () => {
    const BASE_URL = 'https://ig.local.com/scripttag'

    const scriptElement = document.createElement('script')
    scriptElement.type = 'text/javascript'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.src = `${BASE_URL}/index.min.js?v=${new Date().getTime()}`

    scriptElement.onload = function() {
        // Remove the placeholder once the React component is loaded
        document.getElementById('ig-placeholder').remove()
    }

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(scriptElement, firstScript)
})()
